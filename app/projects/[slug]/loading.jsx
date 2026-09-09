import Skeleton from "@/components/Skeleton";

export default function ProjectSlugLoading() {
  return (
    <Skeleton.Page>
      <div className="relative min-h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10">
        {/* ── Project Detail Grid ── */}
        <div className="min-h-screen flex justify-center items-center w-full">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 mt-10 md:mt-0 w-full max-w-6xl">
            {/* Left — metadata */}
            <div className="flex justify-center items-start flex-col mb-5 space-y-10 mx-auto w-full p-4">
              {/* project label */}
              <div className="space-y-3 w-full">
                <Skeleton.Line width="100px" height="h-5" />
                <Skeleton.Line width="70%" height="h-10" />
              </div>
              {/* technology */}
              <div className="space-y-3 w-full">
                <Skeleton.Line width="120px" height="h-5" />
                <Skeleton.Line width="85%" height="h-8" />
              </div>
              {/* year */}
              <div className="space-y-3 w-full">
                <Skeleton.Line width="60px" height="h-5" />
                <Skeleton.Line width="100px" height="h-8" />
              </div>
              {/* preview */}
              <div className="space-y-3 w-full">
                <Skeleton.Line width="80px" height="h-5" />
                <Skeleton.Line width="120px" height="h-8" />
              </div>
              {/* source code */}
              <div className="space-y-3 w-full">
                <Skeleton.Line width="120px" height="h-5" />
                <Skeleton.Line width="100px" height="h-8" />
              </div>
            </div>

            {/* Right — description */}
            <div className="flex justify-start items-start flex-col mb-5 w-full p-4 gap-4">
              <Skeleton.Line width="140px" height="h-5" />
              <Skeleton.Paragraph lines={6} className="w-full" />
              <Skeleton.Paragraph lines={4} className="w-full mt-4" />
            </div>
          </div>
        </div>

        {/* ── Image Gallery ── */}
        <div className="mx-auto grid grid-cols-1 p-5 md:p-20 w-full max-w-7xl gap-6">
          <Skeleton.ImageBlock aspectRatio="aspect-video" className="rounded" />
          <Skeleton.ImageBlock aspectRatio="aspect-video" className="rounded" />
          <Skeleton.ImageBlock aspectRatio="aspect-video" className="rounded" />
        </div>
      </div>
    </Skeleton.Page>
  );
}
