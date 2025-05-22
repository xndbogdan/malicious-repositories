// SkeletonCard.js
const CardLoader = () => {
  return (
    <div className="group block rounded-xl overflow-hidden animate-pulse focus:outline-none">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
        {/* Image Skeleton */}
        <div className="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44 bg-gray-700"></div>

        {/* Text Content Skeleton */}
        <div className="grow space-y-3">
          {/* Title Skeleton */}
          <div className="h-6 bg-gray-700 rounded-md w-3/4"></div>

          {/* Paragraph Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
          </div>

          {/* Detail Link Skeleton */}
          <div className="h-4 bg-gray-700 rounded-md w-1/4 mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
