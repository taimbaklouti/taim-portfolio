import Skeleton from "@/components/Skeleton";

export default function ProjectsLoading() {
  return (
    <Skeleton.Page>
      {/* ── Hero Section ── */}
      <div className="relative h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
        <div className="md:absolute top-1/4 md:right-[10%] md:-translate-y-16 mb-48 md:mb-0">
          <Skeleton.Block className="h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] rounded-sm" />
        </div>
        <div className="md:absolute md:left-[10%] top-[60%] md:top-1/3 w-full md:w-auto max-w-2xl px-10 pt-4 md:pt-0">
          <Skeleton.Line width="280px" height="h-14 md:h-20" className="mb-4" />
          <Skeleton.Hr className="mb-4" />
          <Skeleton.Line width="100%" height="h-6" className="mb-6" />
          <Skeleton.Button width="w-36" />
        </div>
      </div>

      {/* ── Highlight Section ── */}
      <div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
        <div className="flex justify-center items-center flex-col my-5 self-start">
          <Skeleton.Hr className="mb-3" />
          <Skeleton.Line width="160px" height="h-8" />
        </div>
      </div>

      {/* Highlight project card */}
      <div className="w-screen mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
        {/* Left — images */}
        <div className="flex justify-center items-start flex-col mb-5">
          <div className="w-full">
            <div className="md:hidden grid grid-cols-2 gap-3">
              <Skeleton.ImageBlock aspectRatio="aspect-video" className="rounded-lg" />
              <Skeleton.ImageBlock aspectRatio="aspect-video" className="rounded-lg" />
              <div className="col-span-2">
                <Skeleton.ImageBlock aspectRatio="aspect-video" className="rounded-lg" />
              </div>
            </div>
            <div className="hidden md:block relative w-full aspect-square">
              <div className="absolute top-28 left-10 h-[40%] aspect-video">
                <Skeleton.Block className="w-full h-full shadow-lg" />
              </div>
              <div className="absolute top-10 right-28 h-[30%] aspect-video">
                <Skeleton.Block className="w-full h-full shadow-lg" />
              </div>
              <div className="absolute bottom-10 md:bottom-26 right-20 h-[35%] aspect-video">
                <Skeleton.Block className="w-full h-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>
        {/* Right — project description */}
        <div className="flex justify-center items-start flex-col mb-5 md:px-10 gap-4">
          <Skeleton.Line width="70%" height="h-8" />
          <Skeleton.Paragraph lines={5} className="w-full" />
          <Skeleton.Button width="w-24" className="mt-3" />
        </div>
      </div>

      {/* ── Category Buttons ── */}
      <div className="flex flex-row justify-center items-start flex-wrap gap-3 md:gap-5 my-5">
        <div className="flex flex-row gap-3">
          <Skeleton.Badge width="w-28" height="h-10" className="rounded-xl" />
          <Skeleton.Badge width="w-36" height="h-10" className="rounded-xl" />
          <Skeleton.Badge width="w-20" height="h-10" className="rounded-xl" />
        </div>
      </div>

      {/* ── Project Cards Grid ── */}
      <div className="w-full mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={`card-${i}`} className="relative aspect-video overflow-hidden rounded-xl">
            <Skeleton.Block className="w-full h-full" />
            {/* Year badge placeholder */}
            <div className="absolute top-0 left-0 p-4">
              <Skeleton.Badge width="w-14" height="h-6" />
            </div>
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 gap-2">
              <Skeleton.Line width="60%" height="h-6" />
              <Skeleton.Line width="90%" height="h-4" />
              <Skeleton.Line width="70%" height="h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Archive Button ── */}
      <div className="flex justify-center items-center my-10">
        <Skeleton.Button width="w-44" />
      </div>
    </Skeleton.Page>
  );
}
