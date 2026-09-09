"use client";
import Skeleton from "@/components/Skeleton";

export default function RootLoading() {
  return (
    <Skeleton.Page>
      {/* ── Hero Section ── */}
      <div className="mx-auto w-[82%] max-w-5xl flex flex-col justify-center min-h-screen px-6 md:px-16 pt-24 md:pt-20 gap-6">
        <Skeleton.Line width="120px" height="h-5" className="mb-2" />
        <Skeleton.Line width="100%" height="h-16 md:h-20" className="mb-1" />
        <Skeleton.Line width="60%" height="h-16 md:h-20" className="mb-4" />
        <Skeleton.Paragraph lines={3} className="w-full max-w-2xl" />
        <div className="flex flex-row items-center gap-4 mt-4">
          <Skeleton.Button width="w-28" />
          <Skeleton.Button width="w-24" />
        </div>
        <div className="flex gap-3 mt-4">
          <Skeleton.Circle size="h-10 w-10" />
          <Skeleton.Circle size="h-10 w-10" />
          <Skeleton.Circle size="h-10 w-10" />
          <Skeleton.Circle size="h-10 w-10" />
        </div>
      </div>

      {/* ── Manifest Band ── */}
      <div className="w-full bg-[var(--color-paper-2)] dark:bg-[var(--color-paper-2-dark)] py-12 px-6 md:px-16">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          <Skeleton.Button width="w-20" />
          <Skeleton.Line width="60%" height="h-10 md:h-12" />
        </div>
      </div>

      {/* ── Bento About ── */}
      <div className="mx-auto w-[82%] max-w-5xl py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[50vh]">
          <Skeleton.Block className="md:col-span-2 md:row-span-2 h-[320px] md:h-full rounded-[var(--radius-xl)]" />
          <Skeleton.Block className="h-40 rounded-[var(--radius-xl)]" />
          <Skeleton.Block className="h-40 rounded-[var(--radius-xl)]" />
          <Skeleton.Block className="h-40 rounded-[var(--radius-xl)]" />
        </div>
      </div>
    </Skeleton.Page>
  );
}
