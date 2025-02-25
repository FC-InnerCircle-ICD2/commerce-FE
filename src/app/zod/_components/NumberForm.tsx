'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { numberSchema } from '@/utils/zod/schema';

type NumberFormData = {
  number: string;
};

export default function NumberForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NumberFormData>({
    resolver: zodResolver(numberSchema),
  });

  const onSubmit = (data: NumberFormData) => {
    console.log('입력된 데이터:', data);
  };

  return (
    <form className="bg-blue-200" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="number">숫자 입력:</label>
      <input id="number" type="text" {...register('number')} />
      {errors.number && <p>{errors.number.message}</p>}

      <button type="submit">제출</button>
    </form>
  );
}
