import { ICartItem } from '@/api/cart';
import { ISelectOptionDetail } from '@/app/products/_components/detail/ProductDetailClient';
import { SelectItem } from '@/app/products/_components/detail/ProductDetailClientOptions';
import { useProductSingle } from '@/hooks/queries/useProducts';
import { numberFormatting } from '@/utils/numberFormatting';
import { useRouter } from 'next/navigation';

type Props = {
  cartProduct: ICartItem;
};

export default function CartListPrice({ cartProduct }: Props) {
  const router = useRouter();
  const { product } = useProductSingle(cartProduct.productId);
  function handlePurchase() {
    const options: SelectItem[] = cartProduct.options.map((item) => {
      return {
        id: item.id,
        value: item.optionDetail.value,
        detailId: item.optionDetail.id,
        optionName: item.name,
        quantity: item.optionDetail.quantity,
        additionalPrice: item.optionDetail.additionalPrice,
      };
    });
    const selectOptions: ISelectOptionDetail[] = [
      {
        count: cartProduct.options[0].optionDetail.quantity,
        options: options,
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
