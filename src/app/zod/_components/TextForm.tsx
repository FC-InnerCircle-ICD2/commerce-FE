'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { textSchema } from '@/utils/zod/schema';

type TextFormData = {
  text: string;
};

export default function TextForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TextFormData>({
    resolver: zodResolver(textSchema),
  });

  const onSubmit = (data: TextFormData) => {
    console.log('입력된 데이터:', data);
  };

  return (
    <form className="bg-pink-300" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="text">텍스트 입력:</label>
      <input id="text" type="text" {...register('text')} />
      {errors.text && <p>{errors.text.message}</p>}

      <button type="submit">제출</button>
    </form>
  );
}
