import { CardSkeleton } from '@/components/skeletons';

export default function ProductListSkeleton() {
  return (
    <div className="lg:px-0 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-slate-50 border border-slate-300 rounded-xl p-7">
        {[...Array(8)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
