'use client';
import { IProductDetail } from '@/api/product';
import { useReviewAddMutate } from '@/hooks/mutate/useReviewMutate';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  orderId: string;
  product: IProductDetail;
};

export default function ReviewForm({ orderId, product }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<string>('0');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { getAccessToken } = useAuthStore();
  const { reviewMutate } = useReviewAddMutate();
  const router = useRouter();

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // 이미지 미리보기 설정
    }
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleChangeRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || /^(?:[0-4](?:\.\d{0,1})?|5(?:\.0?)?)$/.test(event.target.value)) {
      setRating(event.target.value);
    }
  };

  const handleUpload = async () => {
    if (!file || !content || !rating) {
      alert('빈값이 존재하면 안됩니다');
      return;
    }

    const formData = new FormData();

    formData.append('orderId', orderId);
    formData.append('productName', product.name);
    // TODO: 해당 부분들 배열형식으로 수정되야할듯.
    formData.append('productOptionId', String(product.options[0].id));
    formData.append('productOptionName', product.options[0].name);
    formData.append('rating', rating);
    formData.append('content', content);
    formData.append('reviewImages', file);
    reviewMutate({
      productId: product.id,
      formData,
    });
  };

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/');
    }
  }, [getAccessToken, router]);

  return (
    <div className="w-full flex flex-col items-center">
      <article className="w-full flex gap-4 py-[30px] px-[16px] items-center border-b border-slate-300">
        <img
          src={product.images?.[0]?.url || '/assets/preparing.png'}
          className="w-[150px] h-[150px] bg-pink-50"
          alt={product.name}
        />
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-sm">{product.name}</h3>
          <div className="flex flex-col gap-2">
            <label>별점을 입력해주세요.</label>
            <input
              type="text"
              value={rating}
              onChange={handleChangeRating}
              placeholder="0 ~ 5 점 (소수점 가능)"
              className="p-2 border rounded w-full"
            />
          </div>
        </div>
      </article>
      <article className="w-full flex gap-8 py-[15px] border-b border-slate-300">
        <label className="text-sm font-bold">사진 등록</label>
        <button onClick={triggerFileInput} className="text-black px-4 h-[40px] rounded cursor-pointer border">
          📤 파일 선택
        </button>
        <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover" />}
      </article>
      <article className="w-full flex gap-8 py-[15px]">
        <label className="text-sm font-bold">상세 리뷰</label>
        <textarea
          value={content}
          onChange={handleReviewChange}
          placeholder="상세 리뷰를 달아주세요!"
          className="h-[200px] p-2 border rounded grow resize-none outline-none"
        />
      </article>
      <button onClick={handleUpload} className="my-8 w-[200px] py-3 bg-blue-500 text-white rounded">
        리뷰 등록
      </button>
    </div>
  );
}
