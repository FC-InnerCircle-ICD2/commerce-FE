import { ICartItem } from '@/api/cart';
import { ISelectOptionDetail } from '@/app/products/_components/detail/ProductDetailClient';
import { useProductSingle } from '@/hooks/queries/useProducts';
import { numberFormatting } from '@/utils/numberFormatting';
import { useRouter } from 'next/navigation';

type Props = {
  cartProduct: ICartItem;
};

export default function CartListPrice({ cartProduct }: Props) {
  const router = useRouter();
  const { product } = useProductSingle(String(cartProduct.productId));
  function handlePurchase() {
    const selectOptions: ISelectOptionDetail[] = [
      {
        count: cartProduct.option.optionDetail.quantity,
        options: [
          {
            id: cartProduct.option.id,
            value: cartProduct.option.optionDetail.value,
            detailId: cartProduct.option.optionDetail.id,
            optionName: cartProduct.option.name,
            quantity: cartProduct.option.optionDetail.quantity,
            additionalPrice: cartProduct.option.optionDetail.additionalPrice,
          },
        ],
      },
    ];

    if (selectOptions.length > 0) {
      const paramData = {
        product,
        selectedOptions: selectOptions,
      };
      const encodedData = encodeURIComponent(JSON.stringify(paramData));
      router.push(`/purchase?data=${encodedData}`);
    }
  }

  return (
    <div className="grow flex items-end gap-[20px] justify-between flex-col p-[20px] border-l tablet:h-full tablet:items-center tablet:border-l-0">
      <div className="flex gap-[3px] w-full justify-between tablet:flex-col tablet:items-center">
        <h1 className="text-xs font-bold">상품금액</h1>
        <p className="text-sm font-bold">{numberFormatting(cartProduct.price)}원</p>
      </div>
      <button
        className="text-xs border border-blue-300 py-[4px] px-[8px] rounded-sm font-semibold text-blue-500"
        onClick={handlePurchase}
      >
        주문하기
      </button>
    </div>
  );
}
