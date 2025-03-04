import { IProductDetail } from '@/api/product';
import type { ISelectOptionDetail } from './ProductDetailClient';
import { useCartAddMutate } from '@/hooks/mutate/useCartMutate';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { ICartOption } from '@/api/cart';

type Props = {
  product: IProductDetail;
  seletedOptionDetail: ISelectOptionDetail;
  handleOptionCount: (option: ISelectOptionDetail, flag: boolean) => void;
  handleRemoveOption: (option: ISelectOptionDetail) => void;
};

export default function ProductDetailSelectOptions({
  product,
  seletedOptionDetail,
  handleOptionCount,
  handleRemoveOption,
}: Props) {
  const { isLoggedIn } = useAuthStore();
  const { addCartMutate } = useCartAddMutate();
  function formatSelectOptions(): string {
    return seletedOptionDetail.options.map((option) => option.value).join(' / ');
  }

  function getAdditionalPrice() {
    return seletedOptionDetail.options.reduce((sum, option) => sum + option.additionalPrice, 0);
  }

  function handleAddCartsButton() {
    const options: ICartOption[] = seletedOptionDetail.options.map((item) => {
      return {
        id: item.id,
        name: item.optionName,
        optionDetail: {
          id: item.detailId,
          value: item.value,
          quantity: item.quantity,
          additionalPrice: item.additionalPrice,
        },
      };
    });

    addCartMutate({
      datas: {
        productId: String(product.id),
        productName: product.name,
        price: Number(product.price),
        options: options,
        images: {
          id: Number(product.images[0].id),
          url: product.images[0].url,
        },
        provider: {
          id: Number(product.provider.id),
          name: product.provider.name,
        },
      },
    });
  }

  return (
    <div className="border rounded-lg p-4 bg-[#FFFFFF]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-md font-semibold">{formatSelectOptions()}</span>
        <div className="flex gap-4 items-center">
          {isLoggedIn && (
            <button onClick={() => handleAddCartsButton()}>
              <ShoppingCartIcon className="w-6 h-6 text-[#000000]" />
            </button>
          )}
          <button className="text-gray-500" onClick={() => handleRemoveOption(seletedOptionDetail)}>
            ✕
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center rounded-lg overflow-hidden">
          <button
            className="px-4 py-2 border rounded-2xl text-[#CCCCCC]"
            onClick={() => handleOptionCount(seletedOptionDetail, false)}
          >
            -
          </button>
          <span className="px-6 py-2 text-lg">{seletedOptionDetail.count}</span>
          <button
            className="px-4 py-2 border rounded-2xl text-[#CCCCCC]"
            onClick={() => handleOptionCount(seletedOptionDetail, true)}
          >
            +
          </button>
        </div>
        <span className="text-lg font-semibold">
          {((product.price + getAdditionalPrice()) * seletedOptionDetail.count).toLocaleString()} 원
        </span>
      </div>
    </div>
  );
}
