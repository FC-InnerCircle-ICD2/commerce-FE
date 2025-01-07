"use client";
import Star from "../../assets/star.png";

type Props = {
  imgUrl: string;
  title: string;
  price: number;
  discount?: number;
  star: number;
};

export default function Card({ imgUrl, title, price, discount, star }: Props) {
  return (
    <div className="w-full">
      <img
        src={imgUrl}
        className="w-full h-auto aspect-square max-w-full block rounded-2xl bg-yellow-200"
      />
      <div className="p-2">
        <p className="font-medium">{title}</p>
        {discount && (
          <p className="text-sm text-gray-500 font-light decoration-dashed mt-2">
            {price}원
          </p>
        )}
        <div className="flex justify-between">
          <div className="flex gap-1">
            {discount && (
              <p className="font-bold text-red-500 text-lg">{discount}%</p>
            )}
            <p className="font-bold text-xl">
              {discount ? price / discount : price}원
            </p>
          </div>
          <div className="flex gap-[7] items-center">
            <img src={Star.src} alt="star" className=" w-[25] h-[25]" />
            <p>{star}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
