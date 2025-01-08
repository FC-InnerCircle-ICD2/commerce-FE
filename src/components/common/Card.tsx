'use client';
import Star from '../../assets/star.png';

type Props = {
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
 * @param {string} props.imgUrl - 이미지 URL (상품 이미지 경로)
 * @param {string} props.title - 카드 제목 (상품명)
 * @param {number} props.price - 가격
 * @param {number} [props.discount] - 할인율
 * @param {number} props.review - 리뷰 수
 */
export default function Card({ imgUrl, title, price, discount, review }: Props) {
  return (
    <div className="w-full">
      <img src={imgUrl} className="w-full h-auto aspect-square max-w-full block rounded-2xl bg-yellow-200" />
      <div className="p-2">
        <p className="text-sm sm:text-base font-medium">{title}</p>
        {discount && (
          <p className="text-xs sm:text-sm text-[#989898] font-light line-through mt-2">{price.toLocaleString()}원</p>
        )}
        <div className="flex gap-1 items-end flex-wrap">
          {discount && <p className="font-bold text-[#FF5F5F] text-sm sm:text-lg">{discount}%</p>}
          <p className="font-bold sm:text-xl">{discount ? price / discount : price}원</p>
        </div>
        <div className="flex items-center mt-1">
          <img src={Star.src} alt="star" className="w-[12] h-[12] sm:w-[25] sm:h-[25]" />
          <img src={Star.src} alt="star" className="w-[12] h-[12] sm:w-[25] sm:h-[25]" />
          <img src={Star.src} alt="star" className="w-[12] h-[12] sm:w-[25] sm:h-[25]" />
          <img src={Star.src} alt="star" className="w-[12] h-[12] sm:w-[25] sm:h-[25]" />
          <img src={Star.src} alt="star" className="w-[12] h-[12] sm:w-[25] sm:h-[25]" />
          <p className="text-[#5A5A5A] text-sm sm:text-base ml-1">({review.toLocaleString()})</p>
        </div>
      </div>
    </div>
  );
}
