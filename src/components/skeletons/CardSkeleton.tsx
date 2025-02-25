export default function CardSkeleton() {
  return (
    <div className="w-full animate-pulse cursor-pointer">
      <div className="w-full aspect-square bg-gray-200 rounded-2xl"></div>
      <div className="p-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="w-[18px] h-[18px] bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
