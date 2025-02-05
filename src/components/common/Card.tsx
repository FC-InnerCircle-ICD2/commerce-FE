'use client';

import Star from '@/assets/star.png';
import { numberFormatting } from '@/utils/numberFormatting';
import { useRouter } from 'next/navigation';

type Props = {
  /** 상품 ID */
  productId: number;
  /** 이미지 URL (상품 이미지 경로) */
  imgUrl: string;

  /** 카드 제목 (상품명) */
  title: string;

  /** 가격 */
  price: number;

  /** 할인율 */
  discount?: number;

  /** 리뷰 수 */
  review: number;
};

/**
 * Card 컴포넌트는 상품 정보를 시각적으로 표시합니다.
 *
 * @param {Props} props - 컴포넌트에 전달되는 프로퍼티 객체
 * @param {number} props.productId
 * @param {string} props.imgUrl - 이미지 URL (상품 이미지 경로)
 * @param {string} props.title - 카드 제목 (상품명)
 * @param {number} props.price - 가격
 * @param {number} [props.discount] - 할인율
 * @param {number} props.review - 리뷰 수
 */
export default function Card({ productId, imgUrl, title, price, discount, review }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="w-full cursor-pointer" onClick={handleCardClick}>
      <img src={imgUrl} className="w-full h-auto aspect-square max-w-full block rounded-2xl" />
      <div className="p-2">
        <p className="text-sm sm:text-base font-medium mb-[25px]">{title}</p>
        {discount && (
          <p className="text-xs sm:text-sm text-[#989898] font-light line-through mt-2">{price?.toLocaleString()}원</p>
        )}
        <div className="flex justify-between">
          <div className="flex gap-1">
            {discount && <p className="font-bold text-[#FF5F5F] text-sm sm:text-lg">{discount}%</p>}
            <p className="font-bold sm:text-xl">{numberFormatting(discount ? price / discount : price)}원</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <img src={Star.src} alt="star" className="w-[25px] h-[25px] sm:w-[18px] sm:h-[18px]" />
            <p className="text-[#5A5A5A] text-sm sm:text-base ml-1">{review ? review.toLocaleString() : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
