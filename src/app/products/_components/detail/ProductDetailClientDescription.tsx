import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
};

export default function ProductDetailClientDescription({ product }: Props) {
  return (
    <div className="w-full bg-white p-6">
      <div className="mt-4 pb-4 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.description}</p>
      </div>
      <h2 className="text-xl font-semibold text-gray-800">제조: {product.provider.name}</h2>
      <p className="text-sm text-gray-500 mt-1">{product.provider.description}</p>
      <div className="flex flex-col mt-4">
        {product.images
          .filter((item) => item.type !== 'MAIN')
          .sort((a, b) => a.fileOrder - b.fileOrder)
          .map((img) => {
            return <img key={img.id + img.fileOrder} src={img.url} alt={String(img.id)} className="w-full h-auto" />;
          })}
      </div>
    </div>
  );
}
