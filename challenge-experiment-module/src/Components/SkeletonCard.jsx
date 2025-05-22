// SkeletonCard.js
const SkeletonCard = () => {
  return (
    <div className="group flex flex-col h-full border border-white/5 rounded-xl p-5 backdrop-blur-md bg-white/5 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-w-16 aspect-h-11 bg-gray-800 rounded-xl">
        <div className="w-full h-60 bg-gray-700 rounded-xl" />
      </div>

      {/* Title Skeleton */}
      <div className="my-6">
        <div className="h-6 bg-gray-700 rounded-md w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded-md w-full"></div>
      </div>

      {/* Bottom Skeleton */}
      <div className="mt-auto flex items-center gap-x-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded-md w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
