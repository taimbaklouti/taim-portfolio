"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   CONFIG — tuned for FUN, not realism
   ═══════════════════════════════════════════════════════════════════ */
const GRAVITY = 1200;
const BALL_R = 14;
const RIM_R = 28; // wide & forgiving
const NET_DEPTH = 30;
const NET_SEGS = 6;

const DRAG_MIN = 15;
const LAUNCH_SPEED = 900;
const MAX_POWER = 1.4;

const AIR_DRAG = 0.999;
const BOUNCE_WALL = 0.6;
const BOUNCE_FLOOR = 0.5;
const BOUNCE_RIM = 0.65;

// Difficulty presets
const DIFF = {
  easy: { label: "EASY", color: "#34d399", lives: 5, rimScale: 1.15, shrink: 0.15 },
  medium: { label: "MEDIUM", color: "#fbbf24", lives: 3, rimScale: 1.0, shrink: 0.3 },
  hard: { label: "HARD", color: "#f87171", lives: 2, rimScale: 0.82, shrink: 0.5 },
};

const DIFF_KEYS = ["easy", "medium", "hard"];

/* ═══════════════════════════════════════════════════════════════════
   SOUND (Web Audio, procedural)
   ═══════════════════════════════════════════════════════════════════ */
class SFX {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx)
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch {}
  }
  _beep(f, type, dur, vol = 0.12) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.setValueAtTime(vol, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    o.connect(g);
    g.connect(this.ctx.destination);
    o.start();
    o.stop(this.ctx.currentTime + dur);
  }
  bounce() {
    this._beep(260, "triangle", 0.06, 0.08);
  }
  rimHit() {
    this._beep(700, "square", 0.05, 0.06);
    this._beep(1100, "sine", 0.04, 0.04);
  }
  wallHit() {
    this._beep(180, "triangle", 0.05, 0.05);
  }
  score() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.1, t + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.18);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start(t + i * 0.06);
      o.stop(t + i * 0.06 + 0.2);
    });
  }
  swish() {
    this.score();
    if (!this.ctx) return;
    // whoosh noise
    const len = this.ctx.sampleRate * 0.1;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) * 0.03;
    const s = this.ctx.createBufferSource();
    s.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 2000;
    s.connect(f);
    f.connect(this.ctx.destination);
    s.start();
  }
  bank() {
    this.score();
    this._beep(160, "square", 0.06, 0.08);
  }
  miss() {
    this._beep(150, "sawtooth", 0.12, 0.05);
  }
  combo(n) {
    this._beep(600 + n * 60, "sine", 0.12, 0.08);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════════════════════════════ */
function spawnParticles(list, x, y, count, color, speed = 200) {
  for (let i = 0; i < count; i++) {
    const a = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    list.push({
      x,
      y,
      vx: Math.cos(a) * (speed * (0.5 + Math.random() * 0.5)),
      vy: Math.sin(a) * (speed * (0.5 + Math.random() * 0.5)) - 80,
      life: 0.7 + Math.random() * 0.3,
      maxLife: 1,
      r: 2 + Math.random() * 3,
      color,
    });
  }
}
function tickParticles(list, dt) {
  for (let i = list.length - 1; i >= 0; i--) {
    const p = list[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 300 * dt;
    p.life -= dt;
    if (p.life <= 0) list.splice(i, 1);
  }
}
function drawParticles(ctx, list) {
  for (const p of list) {
    const a = Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * a, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ═══════════════════════════════════════════════════════════════════
   NET (verlet-ish)
   ═══════════════════════════════════════════════════════════════════ */
function makeNet(cx, cy, r) {
  const pts = [];
  for (let i = 0; i <= NET_SEGS; i++) {
    const t = i / NET_SEGS;
    const x = cx - r + t * r * 2;
    pts.push({ x, y: cy, ox: x, oy: cy, pin: i === 0 || i === NET_SEGS });
  }
  return pts;
}
function tickNet(pts, cx, cy, r, dt) {
  for (let s = 0; s < 3; s++) {
    for (const p of pts) {
      if (p.pin) {
        const i = pts.indexOf(p);
        p.x = cx - r + (i / (pts.length - 1)) * r * 2;
        p.y = cy;
        continue;
      }
      const vx = (p.x - p.ox) * 0.97;
      const vy = (p.y - p.oy) * 0.97;
      p.ox = p.x;
      p.oy = p.y;
      p.x += vx;
      p.y += vy + 200 * dt * dt;
    }
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i],
        b = pts[i + 1];
      const dx = b.x - a.x,
        dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const tgt = (r * 2) / (pts.length - 1);
      const diff = ((d - tgt) / d) * 0.4;
      if (!a.pin) {
        a.x += dx * diff;
        a.y += dy * diff;
      }
      if (!b.pin) {
        b.x -= dx * diff;
        b.y -= dy * diff;
      }
    }
  }
}
function drawNet(ctx, pts, cy) {
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const t = i / (pts.length - 1);
    const ey = p.y + NET_DEPTH * (0.4 + 0.6 * Math.sin(t * Math.PI));
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, ey);
    ctx.stroke();
  }
  for (let row = 1; row <= 2; row++) {
    const rt = row / 3;
    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const x = p.x;
      const y = p.y + NET_DEPTH * rt * (0.5 + 0.5 * Math.sin((i / (pts.length - 1)) * Math.PI));
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

/* ═══════════════════════════════════════════════════════════════════
   GAME STATES
   ═══════════════════════════════════════════════════════════════════ */
const ST = { MENU: 0, AIM: 1, FLY: 2, WAIT: 3, OVER: 4 };

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function BasketGame({ onClose }) {
  const cvsRef = useRef(null);
  const G = useRef(null);
  const raf = useRef(null);
  const sfx = useRef(new SFX());

  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [state, setState] = useState(ST.MENU);
  const [diff, setDiff] = useState("medium");
  const [swishes, setSwishes] = useState(0);
  const [banks, setBanks] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [made, setMade] = useState(0);

  // Load high score
  const loadHi = useCallback((d) => {
    try {
      const v = localStorage.getItem(`bs-hi-${d}`);
      const hs = v ? parseInt(v, 10) : 0;
      setHiScore(hs);
      if (G.current) G.current.hi = hs;
    } catch {}
  }, []);

  useEffect(() => {
    loadHi(diff);
  }, [diff, loadHi]);

  // ESC
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // ═══ MAIN EFFECT ═══════════════════════════════════════════════
  useEffect(() => {
    const cvs = cvsRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    let W, H;
    const dpr = window.devicePixelRatio || 1;

    // ─── Game state ─────────────────────────────────────────────
    const g = {
      st: ST.MENU,
      diff: "medium",
      ball: { x: 0, y: 0, vx: 0, vy: 0, active: false },
      hoopX: 0,
      hoopY: 0,
      rimR: RIM_R,
      net: [],
      mx: 0,
      my: 0,
      drag: false,
      score: 0,
      hi: 0,
      combo: 0,
      bestCombo: 0,
      lives: 3,
      swishes: 0,
      banks: 0,
      attempts: 0,
      made: 0,
      timer: 0,
      particles: [],
      trail: [],
      popups: [],
      rimGlow: 0,
      hitRim: false,
      hitBB: false,
      lastT: 0,
      // difficulty buttons bounds
      btns: [],
    };
    G.current = g;

    const resetBall = () => {
      const b = g.ball;
      b.x = W * 0.22;
      b.y = H * 0.72;
      b.vx = 0;
      b.vy = 0;
      b.active = false;
      g.trail = [];
      g.hitRim = false;
      g.hitBB = false;
    };

    const applyDiff = (d) => {
      const cfg = DIFF[d];
      g.diff = d;
      g.lives = cfg.lives;
      g.rimR = RIM_R * cfg.rimScale;
      resetBall();
      setDiff(d);
      setLives(cfg.lives);
      // load hi
      try {
        const v = localStorage.getItem(`bs-hi-${d}`);
        g.hi = v ? parseInt(v, 10) : 0;
        setHiScore(g.hi);
      } catch {}
    };

    const resize = () => {
      W = cvs.clientWidth;
      H = cvs.clientHeight;
      cvs.width = W * dpr;
      cvs.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.hoopX = W * 0.72;
      g.hoopY = H * 0.35;
      const sc = DIFF[g.diff].rimScale;
      g.rimR = RIM_R * sc;
      g.net = makeNet(g.hoopX, g.hoopY, g.rimR);
      resetBall();
    };
    resize();
    window.addEventListener("resize", resize);

    // ─── Drawing ────────────────────────────────────────────────
    const drawBg = () => {
      // Gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#0a0a1a");
      grad.addColorStop(1, "#1a0a2e");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 1;
      const gs = 40;
      for (let x = 0; x < W; x += gs) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gs) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    const drawHoop = () => {
      const sc = W / 600;
      const rw = g.rimR * sc;
      const bx = g.hoopX,
        by = g.hoopY;

      // Backboard
      const bw = 50 * sc,
        bh = 70 * sc;
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(bx - bw / 2, by - bh * 0.5, bw, bh, 4);
      ctx.fill();
      ctx.stroke();

      // Inner square
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx - bw * 0.3, by - bh * 0.2, bw * 0.6, bh * 0.35, 2);
      ctx.stroke();

      // Rim glow
      const glow = 0.3 + g.rimGlow * 0.7;
      ctx.shadowColor = "#ef4444";
      ctx.shadowBlur = 15 * glow;

      // Rim (orange ring)
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(bx, by, rw, 0, Math.PI, true);
      ctx.stroke();

      ctx.shadowBlur = 0;
      g.rimGlow = Math.max(0, g.rimGlow - 0.03);

      // Net
      drawNet(ctx, g.net, by);
    };

    const drawBall = () => {
      const b = g.ball;
      const sc = W / 600;
      const r = BALL_R * sc;

      // Trail
      for (let i = 0; i < g.trail.length; i++) {
        const t = g.trail[i];
        const a = (i / g.trail.length) * 0.25;
        const s = r * (0.3 + 0.7 * (i / g.trail.length));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.arc(t.x, t.y, s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Glow
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r * 2.5);
      grad.addColorStop(0, "rgba(249,115,22,0.3)");
      grad.addColorStop(1, "rgba(249,115,22,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, r * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Ball body
      const bg = ctx.createRadialGradient(b.x - r * 0.3, b.y - r * 0.3, 0, b.x, b.y, r);
      bg.addColorStop(0, "#fb923c");
      bg.addColorStop(0.7, "#f97316");
      bg.addColorStop(1, "#ea580c");
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Lines
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y - r);
      ctx.lineTo(b.x, b.y + r);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(b.x - r, b.y);
      ctx.lineTo(b.x + r, b.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(b.x, b.y, r * 0.55, -0.7, 0.7);
      ctx.stroke();
    };

    const drawAim = () => {
      if (g.st !== ST.AIM || !g.drag) return;
      const b = g.ball;
      const dx = g.mx - b.x,
        dy = g.my - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < DRAG_MIN) return;

      const pw = Math.min(dist / 80, MAX_POWER);
      const vx = (dx / dist) * LAUNCH_SPEED * pw;
      const vy = (dy / dist) * LAUNCH_SPEED * pw;

      // Trajectory
      let px = b.x,
        py = b.y,
        pvx = vx,
        pvy = vy;
      const dt = 0.016;
      for (let i = 0; i < 35; i++) {
        const a = 1 - i / 35;
        ctx.fillStyle = `rgba(249,115,22,${a * 0.3})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.5 + a * 2, 0, Math.PI * 2);
        ctx.fill();
        pvx *= AIR_DRAG;
        px += pvx * dt;
        py += pvy * dt;
        pvy += GRAVITY * dt;
        if (py > H + 50) break;
      }

      // Power arc
      const angle = Math.atan2(dy, dx);
      ctx.strokeStyle = `rgba(249,115,22,${pw * 0.5})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 35, angle - 0.35, angle + 0.35);
      ctx.stroke();
    };

    const drawHUD = () => {
      const fs = Math.round(W / 16);

      // Score (big, center-top)
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.font = `${fs}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText(g.score, W / 2, H * 0.1);

      // Score flash
      if (g.st === ST.WAIT && g.timer > 0.3) {
        ctx.fillStyle = "#fbbf24";
        ctx.font = `bold ${Math.round(W / 20)}px monospace`;
        ctx.fillText("+1", W / 2 + 50, H * 0.07);
      }

      // High score
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = `${Math.round(W / 32)}px monospace`;
      ctx.textAlign = "right";
      ctx.fillText(`BEST ${g.hi}`, W - 16, 24);

      // Combo
      if (g.combo >= 2) {
        ctx.fillStyle = "#f97316";
        ctx.font = `bold ${Math.round(W / 26)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(`${g.combo}x COMBO`, W / 2, H * 0.17);
      }

      // Lives
      ctx.textAlign = "left";
      ctx.font = `${Math.round(W / 28)}px monospace`;
      const maxL = DIFF[g.diff].lives;
      for (let i = 0; i < maxL; i++) {
        ctx.fillStyle = i < g.lives ? "#ef4444" : "rgba(255,255,255,0.06)";
        ctx.fillText("●", 16 + i * 20, 24);
      }

      // Difficulty label
      ctx.fillStyle = DIFF[g.diff].color + "55";
      ctx.font = `bold ${Math.round(W / 40)}px monospace`;
      ctx.fillText(DIFF[g.diff].label, 16 + maxL * 20 + 6, 24);

      // Stats row
      if (g.attempts > 0) {
        const sy = 44;
        const sfs = Math.round(W / 42);
        ctx.font = `${sfs}px monospace`;
        ctx.textAlign = "left";
        let sx = 16;
        if (g.banks > 0) {
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.fillText("🏀", sx, sy);
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.fillText(`${g.banks}`, sx + sfs + 2, sy);
          sx += sfs * 2.2;
        }
        if (g.swishes > 0) {
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.fillText("🟦", sx, sy);
          ctx.fillStyle = "rgba(34,211,238,0.4)";
          ctx.fillText(`${g.swishes}`, sx + sfs + 2, sy);
          sx += sfs * 2.2;
        }
        const acc = Math.round((g.made / g.attempts) * 100);
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.fillText("🎯", sx, sy);
        ctx.fillStyle =
          acc >= 60
            ? "rgba(34,211,238,0.4)"
            : acc >= 30
              ? "rgba(251,191,36,0.4)"
              : "rgba(248,113,113,0.4)";
        ctx.fillText(`${acc}%`, sx + sfs + 2, sy);
      }

      // Popups
      for (let i = g.popups.length - 1; i >= 0; i--) {
        const p = g.popups[i];
        const a = Math.max(0, p.life / p.max);
        ctx.globalAlpha = a;
        ctx.fillStyle = p.col;
        ctx.font = `bold ${Math.round(W / 22)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(p.txt, p.x, p.y);
        p.y -= 50 * (1 / 60);
        p.life -= 1 / 60;
        if (p.life <= 0) g.popups.splice(i, 1);
      }
      ctx.globalAlpha = 1;
    };

    const drawMenu = () => {
      // Dark overlay
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, W, H);

      ctx.textAlign = "center";

      // Title
      ctx.fillStyle = "#f97316";
      ctx.font = `bold ${Math.round(W / 9)}px monospace`;
      ctx.fillText("🏀", W / 2, H * 0.22);

      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(W / 16)}px monospace`;
      ctx.fillText("SHOOT YOUR SHOT", W / 2, H * 0.32);

      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = `${Math.round(W / 30)}px monospace`;
      ctx.fillText("Drag from the ball to aim", W / 2, H * 0.39);

      // Difficulty buttons
      const bw = 80 * (W / 600),
        bh = 34 * (W / 600),
        gap = 14 * (W / 600);
      const tw = bw * 3 + gap * 2;
      const startX = W / 2 - tw / 2;
      const by = H * 0.48;

      ctx.font = `bold ${Math.round(W / 34)}px monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillText("DIFFICULTY", W / 2, by - 10);

      g.btns = [];
      DIFF_KEYS.forEach((k, i) => {
        const cfg = DIFF[k];
        const bx = startX + i * (bw + gap);
        const sel = g.diff === k;
        g.btns.push({ x: bx, y: by, w: bw, h: bh, k });

        ctx.fillStyle = sel ? cfg.color + "22" : "rgba(255,255,255,0.03)";
        ctx.strokeStyle = sel ? cfg.color : "rgba(255,255,255,0.08)";
        ctx.lineWidth = sel ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = sel ? cfg.color : "rgba(255,255,255,0.3)";
        ctx.font = `bold ${Math.round(W / 30)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(cfg.label, bx + bw / 2, by + bh / 2 + 6);
      });

      // Hint
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 400);
      ctx.fillStyle = `rgba(249,115,22,${0.4 + pulse * 0.4})`;
      ctx.font = `bold ${Math.round(W / 22)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("TAP TO START", W / 2, H * 0.68);
    };

    const drawOver = () => {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = "center";
      const cx = W / 2;

      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(W / 12)}px monospace`;
      ctx.fillText("GAME OVER", cx, H * 0.18);

      // Difficulty badge
      const dc = DIFF[g.diff];
      ctx.fillStyle = dc.color + "44";
      ctx.font = `bold ${Math.round(W / 34)}px monospace`;
      ctx.fillText(dc.label, cx, H * 0.23);

      // Score
      ctx.fillStyle = "#f97316";
      ctx.font = `bold ${Math.round(W / 9)}px monospace`;
      ctx.fillText(g.score, cx, H * 0.35);

      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = `${Math.round(W / 34)}px monospace`;
      ctx.fillText("POINTS", cx, H * 0.39);

      // Stats grid
      const fs = Math.round(W / 38);
      const vs = Math.round(W / 24);
      const y1 = H * 0.47,
        y2 = H * 0.56;
      const cL = cx - 85 * (W / 600),
        cC = cx,
        cR = cx + 85 * (W / 600);

      ctx.font = `${fs}px monospace`;
      // Row 1
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText("BEST", cL, y1 - 6);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${vs}px monospace`;
      ctx.fillText(`${g.hi}`, cL, y1 + 14);
      ctx.font = `${fs}px monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText("COMBO", cC, y1 - 6);
      ctx.fillStyle = "#f97316";
      ctx.font = `bold ${vs}px monospace`;
      ctx.fillText(`${g.bestCombo}x`, cC, y1 + 14);
      ctx.font = `${fs}px monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText("LIVES", cR, y1 - 6);
      ctx.fillStyle = g.lives > 0 ? "#ef4444" : "rgba(255,255,255,0.1)";
      ctx.font = `bold ${vs}px monospace`;
      ctx.fillText(`${g.lives}`, cR, y1 + 14);

      // Row 2
      ctx.font = `${fs}px monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText("BANK", cL, y2 - 6);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = `bold ${vs}px monospace`;
      ctx.fillText(`${g.banks}`, cL, y2 + 14);
      ctx.font = `${fs}px monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText("SWISH", cC, y2 - 6);
      ctx.fillStyle = "rgba(34,211,238,0.6)";
      ctx.font = `bold ${vs}px monospace`;
      ctx.fillText(`${g.swishes}`, cC, y2 + 14);
      const acc = g.attempts > 0 ? Math.round((g.made / g.attempts) * 100) : 0;
      ctx.font = `${fs}px monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText("ACC", cR, y2 - 6);
      ctx.fillStyle =
        acc >= 60
          ? "rgba(34,211,238,0.7)"
          : acc >= 30
            ? "rgba(251,191,36,0.7)"
            : "rgba(248,113,113,0.7)";
      ctx.font = `bold ${vs}px monospace`;
      ctx.fillText(`${acc}%`, cR, y2 + 14);

      // Restart
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 400);
      ctx.fillStyle = `rgba(249,115,22,${0.4 + pulse * 0.4})`;
      ctx.font = `bold ${Math.round(W / 24)}px monospace`;
      ctx.fillText("TAP TO RESTART", cx, H * 0.72);
    };

    // ─── Physics ────────────────────────────────────────────────
    const physics = (dt) => {
      const b = g.ball;
      if (!b.active) return;

      g.trail.push({ x: b.x, y: b.y });
      if (g.trail.length > 10) g.trail.shift();

      b.vy += GRAVITY * dt;
      b.vx *= Math.pow(AIR_DRAG, dt * 60);
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      const sc = W / 600;
      const r = BALL_R * sc;
      const rw = g.rimR * sc;

      // Walls
      if (b.x - r < 0) {
        b.x = r;
        b.vx = Math.abs(b.vx) * BOUNCE_WALL;
        sfx.current.wallHit();
      }
      if (b.x + r > W) {
        b.x = W - r;
        b.vx = -Math.abs(b.vx) * BOUNCE_WALL;
        sfx.current.wallHit();
      }
      if (b.y - r < 0) {
        b.y = r;
        b.vy = Math.abs(b.vy) * 0.5;
      }

      // Rim collision (circle-point on each end)
      const rimL = g.hoopX - rw,
        rimR2 = g.hoopX + rw,
        rimY = g.hoopY;
      for (const rx of [rimL, rimR2]) {
        const dx = b.x - rx,
          dy = b.y - rimY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < r + 3 && d > 0) {
          const nx = dx / d,
            ny = dy / d;
          const overlap = r + 3 - d;
          b.x += nx * overlap;
          b.y += ny * overlap;
          const dot = b.vx * nx + b.vy * ny;
          b.vx -= 1.5 * dot * nx;
          b.vy -= 1.5 * dot * ny;
          b.vx *= BOUNCE_RIM;
          b.vy *= BOUNCE_RIM;
          g.rimGlow = 1;
          g.hitRim = true;
          sfx.current.rimHit();
        }
      }

      // Backboard collision
      const bw = 50 * sc,
        bh = 70 * sc;
      const bbL = g.hoopX - bw / 2,
        bbR = g.hoopX + bw / 2;
      const bbT = g.hoopY - bh * 0.5,
        bbB = g.hoopY + bh * 0.5;
      const cx2 = Math.max(bbL, Math.min(b.x, bbR));
      const cy2 = Math.max(bbT, Math.min(b.y, bbB));
      const bdx = b.x - cx2,
        bdy = b.y - cy2;
      const bd = Math.sqrt(bdx * bdx + bdy * bdy);
      if (bd < r && bd > 0) {
        const nx = bdx / bd,
          ny = bdy / bd;
        b.x += nx * (r - bd);
        b.y += ny * (r - bd);
        const dot = b.vx * nx + b.vy * ny;
        if (dot < 0) {
          b.vx -= 1.5 * dot * nx;
          b.vy -= 1.5 * dot * ny;
          b.vx *= 0.75;
          b.vy *= 0.75;
          g.hitBB = true;
          g.rimGlow = 0.5;
          spawnParticles(g.particles, cx2, cy2, 5, "rgba(255,255,255,0.4)", 120);
          sfx.current.wallHit();
        }
      }

      // Score detection
      const distToCenter = Math.abs(b.x - g.hoopX);
      if (
        distToCenter < rw * 0.75 &&
        b.y > rimY - r * 0.5 &&
        b.y < rimY + rw * 0.4 &&
        b.vy > 0 &&
        !g.scored
      ) {
        g.scored = true;
        g.rimGlow = 1;

        const isSwish = !g.hitRim && !g.hitBB;
        const isBank = g.hitBB && !g.hitRim;
        const pts = isSwish ? 3 : isBank ? 2 : 1;
        g.score += pts;
        g.combo++;
        g.made++;
        if (g.combo > g.bestCombo) g.bestCombo = g.combo;
        if (isSwish) g.swishes++;
        if (isBank) g.banks++;

        // Difficulty progression
        const cfg = DIFF[g.diff];
        g.rimR = Math.max(RIM_R * 0.5, RIM_R * cfg.rimScale - g.score * cfg.shrink);
        g.net = makeNet(g.hoopX, g.hoopY, g.rimR);

        // Save hi
        if (g.score > g.hi) {
          g.hi = g.score;
          try {
            localStorage.setItem(`bs-hi-${g.diff}`, g.score.toString());
          } catch {}
        }

        // Particles
        const pColor = isSwish ? "#22d3ee" : "#fbbf24";
        const pCount = isSwish ? 30 : 18;
        spawnParticles(g.particles, b.x, b.y, pCount, pColor, isSwish ? 280 : 200);
        spawnParticles(g.particles, g.hoopX, rimY, 8, "#f97316", 150);
        if (isSwish) spawnParticles(g.particles, g.hoopX, rimY, 15, "#22d3ee", 200);

        // Sound
        if (isSwish) sfx.current.swish();
        else if (isBank) sfx.current.bank();
        else if (g.combo >= 3) sfx.current.combo(g.combo);
        else sfx.current.score();

        // Popup
        const label = isSwish ? " SWISH" : isBank ? " BANK" : "";
        const comboT = g.combo >= 2 ? ` ${g.combo}x` : "";
        g.popups.push({
          x: b.x,
          y: b.y - 25,
          txt: `+${pts}${label}${comboT}`,
          col: isSwish ? "#22d3ee" : "#fbbf24",
          life: 1,
          max: 1,
        });

        // Notify React
        setScore(g.score);
        setCombo(g.combo);
        setHiScore(g.hi);
        setBestCombo(g.bestCombo);
        setSwishes(g.swishes);
        setBanks(g.banks);
        setMade(g.made);

        g.st = ST.WAIT;
        g.timer = 0.5;
        setState(ST.WAIT);
      }

      // Miss
      if (b.y + r > H && b.vy > 0 && !g.scored) {
        g.combo = 0;
        g.lives--;
        g.attempts++;
        setCombo(0);
        setLives(g.lives);
        setAttempts(g.attempts);
        sfx.current.miss();

        if (g.lives <= 0) {
          g.st = ST.OVER;
          setState(ST.OVER);
        } else {
          g.st = ST.WAIT;
          g.timer = 0.6;
          setState(ST.WAIT);
        }
      }

      // Off screen
      if ((b.y > H + 200 || b.x < -200 || b.x > W + 200) && !g.scored) {
        g.combo = 0;
        g.lives--;
        g.attempts++;
        setCombo(0);
        setLives(g.lives);
        setAttempts(g.attempts);
        if (g.lives <= 0) {
          g.st = ST.OVER;
          setState(ST.OVER);
        } else {
          g.st = ST.WAIT;
          g.timer = 0.6;
          setState(ST.WAIT);
        }
      }
    };

    // ─── Loop ───────────────────────────────────────────────────
    const loop = (ts) => {
      const dt = Math.min((ts - g.lastT) / 1000, 0.04);
      g.lastT = ts;

      drawBg();

      // Net physics
      const sc = W / 600;
      tickNet(g.net, g.hoopX, g.hoopY, g.rimR * sc, dt);

      // Particles
      tickParticles(g.particles, dt);

      // State transitions
      if (g.st === ST.WAIT) {
        g.timer -= dt;
        if (g.timer <= 0) {
          if (g.lives <= 0) {
            g.st = ST.OVER;
            setState(ST.OVER);
          } else {
            resetBall();
            g.st = ST.AIM;
            setState(ST.AIM);
          }
        }
      }

      physics(dt);
      drawHoop();
      if (g.st !== ST.MENU) drawBall();
      drawAim();
      drawParticles(ctx, g.particles);
      drawHUD();
      if (g.st === ST.MENU) drawMenu();
      if (g.st === ST.OVER) drawOver();

      raf.current = requestAnimationFrame(loop);
    };

    g.lastT = performance.now();
    raf.current = requestAnimationFrame(loop);

    // ─── Input ──────────────────────────────────────────────────
    const pos = (e) => {
      const r = cvs.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - r.left, y: cy - r.top };
    };

    const down = (e) => {
      sfx.current.init();
      const p = pos(e);

      if (g.st === ST.MENU) {
        // Check diff buttons
        for (const btn of g.btns) {
          if (p.x >= btn.x && p.x <= btn.x + btn.w && p.y >= btn.y && p.y <= btn.y + btn.h) {
            applyDiff(btn.k);
            return;
          }
        }
        applyDiff(g.diff);
        g.st = ST.AIM;
        setState(ST.AIM);
        return;
      }
      if (g.st === ST.OVER) {
        applyDiff(g.diff);
        g.score = 0;
        g.combo = 0;
        g.bestCombo = 0;
        g.swishes = 0;
        g.banks = 0;
        g.attempts = 0;
        g.made = 0;
        setScore(0);
        setCombo(0);
        setBestCombo(0);
        setSwishes(0);
        setBanks(0);
        setAttempts(0);
        setMade(0);
        g.st = ST.AIM;
        setState(ST.AIM);
        return;
      }
      if (g.st !== ST.AIM) return;

      g.drag = true;
      g.mx = p.x;
      g.my = p.y;
    };

    const move = (e) => {
      if (g.drag) {
        const p = pos(e);
        g.mx = p.x;
        g.my = p.y;
      }
    };

    const up = () => {
      if (!g.drag || g.st !== ST.AIM) return;
      g.drag = false;
      const b = g.ball;
      const dx = g.mx - b.x,
        dy = g.my - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < DRAG_MIN) return;

      const pw = Math.min(dist / 80, MAX_POWER);
      b.vx = (dx / dist) * LAUNCH_SPEED * pw;
      b.vy = (dy / dist) * LAUNCH_SPEED * pw;
      b.active = true;
      g.scored = false;
      g.attempts++;
      setAttempts(g.attempts);

      g.st = ST.FLY;
      setState(ST.FLY);
      sfx.current.bounce();
    };

    cvs.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    cvs.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);

    return () => {
      window.removeEventListener("resize", resize);
      cvs.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      cvs.removeEventListener("touchstart", down);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100]"
      style={{ background: "#0a0a1a" }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 text-sm"
        aria-label="Close game"
      >
        ✕
      </button>

      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <p className="text-xs font-mono text-white/20">SHOOT YOUR SHOT</p>
      </div>

      <canvas
        ref={cvsRef}
        className="w-full h-full cursor-crosshair"
        aria-label="Basketball shooting game"
      />
    </motion.div>
  );
}
