/**
 * Skeleton — Reusable loading placeholder primitives
 *
 * Mimics the exact shape, dimensions, and spacing of real page content
 * with a shimmer wave animation and full ARIA support.
 *
 * Usage:
 *   <Skeleton.Block className="h-96 w-full rounded-xl" />
 *   <Skeleton.Line className="h-4 w-3/4" />
 *   <Skeleton.Circle className="h-24 w-24" />
 */

const shimmerBase = "skeleton-shimmer";
const pulseBase = "skeleton-pulse";

// ─── Primitive block ────────────────────────────────────────────────
function Block({ className = "", as: Tag = "div", ...props }) {
  return <Tag className={`${shimmerBase} ${className}`} aria-hidden="true" {...props} />;
}

// ─── Line (single text line) ────────────────────────────────────────
function Line({ className = "", width = "100%", height = "h-4", ...props }) {
  return (
    <div
      className={`${shimmerBase} ${height} ${className}`}
      style={{ width }}
      aria-hidden="true"
      {...props}
    />
  );
}

// ─── Circle (avatar, icon, etc.) ────────────────────────────────────
function Circle({ className = "", size = "h-16 w-16", ...props }) {
  return (
    <div
      className={`${shimmerBase} skeleton-circle ${size} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

// ─── Image block (rectangle with aspect ratio) ──────────────────────
function ImageBlock({ className = "", aspectRatio = "aspect-video", ...props }) {
  return (
    <div
      className={`${shimmerBase} ${aspectRatio} w-full ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

// ─── Badge / small tag ─────────────────────────────────────────────
function Badge({ className = "", width = "w-16", height = "h-6", ...props }) {
  return (
    <div
      className={`${shimmerBase} ${height} ${width} rounded-md ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

// ─── Button skeleton ───────────────────────────────────────────────
function Button({ className = "", width = "w-28", ...props }) {
  return (
    <div
      className={`${shimmerBase} h-11 ${width} rounded-lg ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

// ─── Multiple lines (paragraph placeholder) ────────────────────────
function Paragraph({ lines = 3, className = "" }) {
  const widths = ["100%", "92%", "65%"];
  return (
    <div className={`flex flex-col gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Line key={`para-line-${i}`} width={widths[i % widths.length]} />
      ))}
    </div>
  );
}

// ─── Composable page skeleton wrapper ──────────────────────────────
function Page({ children, className = "" }) {
  return (
    <div
      className={`min-h-screen w-full ${className}`}
      role="status"
      aria-label="Loading page content"
      aria-busy="true"
    >
      {children}
      {/* Screen-reader-only text for assistive tech */}
      <span className="sr-only">Loading, please wait…</span>
    </div>
  );
}

// ─── Section wrapper for hierarchical structure ────────────────────
function Section({ children, className = "" }) {
  return (
    <div className={`relative w-full ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}

// ─── HR divider ────────────────────────────────────────────────────
function Hr({ className = "" }) {
  return (
    <div className={`${shimmerBase} h-0.5 w-16 rounded-full ${className}`} aria-hidden="true" />
  );
}

// ─── Export all as named exports + default object ──────────────────
const Skeleton = {
  Page,
  Section,
  Block,
  Line,
  Circle,
  ImageBlock,
  Badge,
  Button,
  Paragraph,
  Hr,
};

export default Skeleton;
export { Block, Line, Circle, ImageBlock, Badge, Button, Paragraph, Page, Section, Hr };
