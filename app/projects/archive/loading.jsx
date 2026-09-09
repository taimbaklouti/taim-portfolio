import Skeleton from "@/components/Skeleton";

export default function ArchiveLoading() {
  return (
    <Skeleton.Page>
      <div className="min-h-screen w-full mt-10 md:mt-0 p-10 flex justify-center items-center flex-col mb-10">
        {/* ── Title Section ── */}
        <div className="flex justify-center items-center flex-col my-5 self-start">
          <div className="flex gap-1 mb-3">
            <Skeleton.Line width="100px" height="h-1" className="rounded-full" />
            <Skeleton.Line width="100px" height="h-1" className="rounded-full" />
          </div>
          <Skeleton.Line width="140px" height="h-10" />
        </div>

        {/* ── Table ── */}
        <div className="mx-auto container md:px-10 grid grid-cols-1 w-full">
          <div className="overflow-hidden rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] shadow-lg">
            {/* Table header */}
            <div className="flex items-center px-6 py-4 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-accent-ghost)]/30 dark:bg-[var(--color-accent-ghost-dark)]/30 gap-4">
              <Skeleton.Line width="60px" height="h-5" />
              <Skeleton.Line width="200px" height="h-5" />
              <div className="hidden md:block flex-1">
                <Skeleton.Line width="120px" height="h-5" />
              </div>
              <Skeleton.Line width="60px" height="h-5" />
            </div>

            {/* Table rows */}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={`row-${i}`}
                className={`flex items-center px-6 py-4 gap-4 ${
                  i % 2 === 0 ? "bg-white/30 dark:bg-neutral-800/20" : ""
                } border-b border-[var(--color-border)]/50 dark:border-[var(--color-border-dark)]/50`}
              >
                <Skeleton.Line width="50px" height="h-4" />
                <Skeleton.Line width="180px" height="h-5" />
                <div className="hidden md:flex flex-1 gap-1.5">
                  <Skeleton.Badge width="w-16" height="h-5" />
                  <Skeleton.Badge width="w-20" height="h-5" />
                  <Skeleton.Badge width="w-14" height="h-5" />
                </div>
                <div className="flex gap-3 w-[60px]">
                  <Skeleton.Circle size="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Skeleton.Page>
  );
}
