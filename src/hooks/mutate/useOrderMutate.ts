// 'use client';
// import { postOrder } from '@/api/order';
// import { useMutation } from '@tanstack/react-query';

// export function useOrderMutate() {
//   const { mutate: orderMutate } = useMutation({
//     mutationKey: ['order'],
//     mutationFn: postOrder,
//     onSuccess: (data) => {
//       console.log('success : ' + data);
//     },
//     onError: (e) => {
//       console.log('asd');
//       console.error(e);
//     },
//   });

//   return { orderMutate };
// }
