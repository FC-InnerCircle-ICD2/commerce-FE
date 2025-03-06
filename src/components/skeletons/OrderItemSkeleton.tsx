export default function OrderItemSkeleton() {
  return (
    <div className="border border-slate-300 bg-slate-50 w-full h-auto p-6 lg:p-8 flex flex-col mt-2">
      <div className="h-4 w-20 bg-gray-200 mb-2 rounded-full"></div>
      <div className="flex items-center my-4">
        <div className="bg-gray-200 w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-[10px]"></div>
        <div className="flex flex-col ml-4 gap-2 max-w-[calc(100%-100px)]">
          <div className="h-3 w-20 bg-gray-200 rounded-full" />
          <div className="h-3 w-48 bg-gray-200 rounded-full" />
          <div className="flex gap-2">
            <div className="h-3 w-12 bg-gray-200 rounded-full" />
            <div className="h-3 w-10 bg-gray-200 rounded-full" />
          </div>
          <div className="h-3 w-20 bg-gray-200 rounded-full" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-gray-200 rounded-lg w-52 h-10"></div>
        <div className="bg-gray-200 rounded-lg w-52 h-10"></div>
      </div>
    </div>
  );
}
