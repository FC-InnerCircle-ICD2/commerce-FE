import { useSearchParams, useRouter } from 'next/navigation';
import { StarIcon as StarEmptyIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarFilledIcon } from '@heroicons/react/24/solid';

export const RatingFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedRating = searchParams?.get('rating') ? Number(searchParams?.get('rating')) : null;

  const handleRatingClick = (rating: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (selectedRating === rating) {
      params.delete('rating');
    } else {
      params.set('rating', rating.toString());
    }
    router.push(`?${params.toString()}`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleRatingClick(rating)}>
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const StarComponent = index < rating ? StarFilledIcon : StarEmptyIcon;
            return <StarComponent key={index} className="h-5 w-5 text-yellow-400" />;
          })}
        </div>
        <span className={`text-sm ${selectedRating === rating ? 'text-blue-600' : 'text-gray-600'}`}>
          {rating}점 이상
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium">별점</h3>
      <div className="space-y-2">
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className={`p-2 rounded-lg ${selectedRating === rating ? 'font-bold' : ''}`}>
            {renderStars(rating)}
          </div>
        ))}
      </div>
    </div>
  );
};
