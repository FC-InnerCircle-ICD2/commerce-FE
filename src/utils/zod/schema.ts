import z from 'zod';

export const idSchema = z.object({
  id: z
    .string()
    .min(5, '아이디는 최소 5자 이상이어야 합니다.')
    .max(20, '아이디는 최대 20자까지 가능합니다.')
    .regex(/^[a-zA-Z0-9]+$/, '아이디는 영문과 숫자만 가능합니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[A-Z]/, '비밀번호에 최소 하나의 대문자가 포함되어야 합니다.')
    .regex(/[a-z]/, '비밀번호에 최소 하나의 소문자가 포함되어야 합니다.')
    .regex(/[0-9]/, '비밀번호에 최소 하나의 숫자가 포함되어야 합니다.')
    .regex(/[\W_]/, '비밀번호에 최소 하나의 특수문자가 포함되어야 합니다.'),
});

export const emailSchema = z.object({
  email: z
    .string()
    .min(5, { message: '이메일은 최소 5자 이상이어야 합니다.' })
    .max(50, { message: '이메일은 최대 50자 이하로 입력해야 합니다.' })
    .email({ message: '올바른 이메일 형식이 아닙니다.' }),
});

export const textSchema = z.object({
  text: z
    .string()
    .min(2, { message: '텍스트는 최소 2자 이상이어야 합니다.' })
    .regex(/^[A-Za-z0-9가-힣]+$/, { message: '특수문자는 사용할 수 없습니다.' }),
});

export const numberSchema = z.object({
  number: z.string().regex(/^[0-9]+$/, { message: '숫자만 입력 가능합니다.' }),
});
