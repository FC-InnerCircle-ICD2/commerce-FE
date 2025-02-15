'use client';

import z from 'zod';
import { idSchema } from '@/utils/zod/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof idSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(idSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('로그인 시도:', data);
  };

  return (
    <form className="bg-slate-300" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>아이디</label>
        <input {...register('id')} />
        {errors.id && <p>{errors.id.message}</p>}
      </div>

      <div>
        <label>비밀번호</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">로그인</button>
    </form>
  );
}
