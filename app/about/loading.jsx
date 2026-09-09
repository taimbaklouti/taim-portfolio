import Skeleton from "@/components/Skeleton";

export default function AboutLoading() {
  return (
    <Skeleton.Page>
      {/* ── Hero Section ── */}
      <div className="relative h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
        {/* Hero image (right on desktop, hidden-ish on mobile) */}
        {/* Slightly taller to roughly match the scale(1.6) animation applied to the real image */}
        <div className="md:absolute top-1/4 md:right-[10%] md:-translate-y-16 mb-48 md:mb-0">
          <Skeleton.Block className="h-[400px] md:h-[640px] w-[80vw] md:w-[30vw] rounded-sm" />
        </div>
        {/* Hero text (left on desktop) */}
        <div className="md:absolute md:left-[10%] top-[60%] md:top-1/3 w-full md:w-auto max-w-2xl px-10 pt-4 md:pt-0">
          <Skeleton.Line width="280px" height="h-14 md:h-20" className="mb-4" />
          <Skeleton.Hr className="mb-4" />
          <Skeleton.Line width="100%" height="h-6" className="mb-6" />
          <Skeleton.Button width="w-36" />
        </div>
      </div>

      {/* ── About Section ── */}
      <div className="mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
        {/* Left — images */}
        <div className="flex justify-center items-start flex-col mb-5">
          <div className="w-full">
            {/* Mobile: 2-column grid */}
            <div className="md:hidden grid grid-cols-2 gap-3">
              <Skeleton.ImageBlock aspectRatio="aspect-square" className="rounded-lg" />
              <Skeleton.ImageBlock aspectRatio="aspect-square" className="rounded-lg" />
              <div className="col-span-2">
                <Skeleton.ImageBlock aspectRatio="aspect-video" className="rounded-lg" />
              </div>
            </div>
            {/* Desktop: artistic absolute layout */}
            <div className="hidden md:block relative w-full aspect-square">
              <div className="absolute top-28 left-10 w-[50%] aspect-square">
                <Skeleton.Block className="w-full h-full" />
              </div>
              <div className="absolute top-16 right-28 w-[30%] aspect-square">
                <Skeleton.Block className="w-full h-full" />
              </div>
              <div className="absolute bottom-16 right-20 w-[40%] aspect-square">
                <Skeleton.Block className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right — text */}
        <div className="flex flex-col justify-center items-start gap-4">
          <Skeleton.Line width="200px" height="h-8" />
          <Skeleton.Paragraph lines={6} className="w-full" />
          <Skeleton.Paragraph lines={4} className="w-full mt-4" />
        </div>
      </div>

      {/* ── Skills Section ── */}
      <div className="w-full px-10 py-16 flex flex-col items-center gap-6">
        <Skeleton.Line width="160px" height="h-10" />
        <div className="flex flex-row gap-3">
          <Skeleton.Badge width="w-24" />
          <Skeleton.Badge width="w-32" />
          <Skeleton.Badge width="w-20" />
        </div>
        {/* Skill tags grid */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
          {Array.from({ length: 12 }, (_, i) => (
            <Skeleton.Badge
              key={`skill-${i}`}
              width={`w-${[16, 20, 24, 28][i % 4]}`}
              height="h-8"
            />
          ))}
        </div>
      </div>

      {/* ── Experience Timeline ── */}
      <div className="w-full px-10 py-16">
        <Skeleton.Line width="200px" height="h-10" className="mx-auto mb-12" />
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={`exp-${i}`} className="flex gap-4 items-start">
              <Skeleton.Circle size="h-4 w-4 shrink-0 mt-2" />
              <div className="flex-1 space-y-2">
                <Skeleton.Line width="60%" height="h-6" />
                <Skeleton.Line width="40%" height="h-4" />
                <Skeleton.Paragraph lines={2} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Education ── */}
      <div className="w-full px-10 py-16">
        <Skeleton.Line width="180px" height="h-10" className="mx-auto mb-8" />
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex gap-4">
            <Skeleton.Badge width="w-16" height="h-16" className="rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton.Line width="50%" height="h-6" />
              <Skeleton.Line width="30%" height="h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Quote Section ── */}
      <div className="w-full px-10 py-20 flex flex-col items-center gap-4">
        <Skeleton.Line width="60px" height="h-10" className="self-start" />
        <Skeleton.Line width="80%" height="h-8" />
        <Skeleton.Line width="50%" height="h-8" />
        <Skeleton.Line width="30%" height="h-4" className="mt-4" />
      </div>
    </Skeleton.Page>
  );
}
