'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema } from '@/utils/zod/schema';

type EmailFormData = {
  email: string;
};

export default function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: EmailFormData) => {
    console.log('입력된 데이터:', data);
  };

  return (
    <form className="bg-slate-200" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">이메일:</label>
      <input id="email" type="email" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">제출</button>
    </form>
  );
}
