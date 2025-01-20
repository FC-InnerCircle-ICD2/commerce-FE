interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface Props {
  products: Product[];
}

export default function OrderList(props: Props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product, index) => (
        <li
          key={index}
          className="border border-slate-300 rounded-[10px] bg-white w-full h-12 p-4 my-[5px] flex items-center justify-between"
        >
          <div className="flex items-center">
            <span className="border border-[#c9c9c9] rounded-[10px] bg-white p-2 text-[11px] mr-2.5">옵션</span>
            <div className="flex justify-between items-center">
              <span className="text-neutral-700 text-sm">{product.name}</span>
              <span className="w-px h-4 bg-[#afafaf] mx-2"></span>
              <span className="text-sm">{product.quantity}개</span>
            </div>
          </div>
          <span className="font-semibold text-sm">{product.price.toLocaleString()}원</span>
        </li>
      ))}
    </ul>
  );
}
