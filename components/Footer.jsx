import FooterCta from "./FooterCta";
import SignatureDrawSVG from "./SignatureDrawSVG";

export default function Footer() {
  return (
    <div className="flex justify-center items-center flex-col overflow-hidden">
      <FooterCta />

      {/* Subtle gradient divider */}
      <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-[var(--color-accent-ghost)] dark:via-[var(--color-accent-ghost-dark)] to-transparent" />

      <footer className="flex justify-center items-center flex-col py-10 px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-4xl">
          <p className="text-sm text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]/70 font-medium">
            &copy;{new Date().getFullYear()} —<span className="font-semibold"> Taim Baklouti</span>
          </p>
          <p className="text-xs text-[var(--color-accent-ghost)] dark:text-[var(--color-accent-ghost-dark)] tracking-wider uppercase">
            Built with Next.js • Tailwind CSS • Framer Motion
          </p>
        </div>

        {/* ── Signature DrawSVG ── */}
        <SignatureDrawSVG variant="compact" className="mt-4" />
      </footer>
    </div>
  );
}
