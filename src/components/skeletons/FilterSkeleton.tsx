export default function FilterSkeleton() {
  return (
    <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl hidden lg:block mb-5 p-8">
      {/* 필터 헤더 */}
      <div className="h-6 w-16 bg-slate-200 rounded mb-5" />
      <hr className="mb-5" />

      {/* 별점 필터 */}
      <div className="space-y-3 mb-5">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-full bg-slate-200 rounded" />
          ))}
        </div>
      </div>
      <hr className="mb-5" />

      {/* 가격 필터 */}
      <div className="space-y-3">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-16 w-full bg-slate-200 rounded" />
      </div>
    </div>
  );
}
