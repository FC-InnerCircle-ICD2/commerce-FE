export default function CategorySkeleton() {
  return (
    <div className="rounded-xl p-8 bg-slate-50 border border-slate-300 hidden lg:block mb-5">
      <div className="text-lg font-bold mb-5 h-6 w-24 bg-slate-200 rounded" />
      <hr />
      <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 mt-3">
        {[...Array(6)].map((_, index) => (
          <li key={index} className="flex-shrink-0 lg:flex-shrink">
            <div className="w-full py-2 h-4 bg-slate-200 rounded" />
          </li>
        ))}
      </ul>
    </div>
  );
}
