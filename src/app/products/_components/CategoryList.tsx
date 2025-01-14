const categories = [
  { id: 1, name: '전체' },
  { id: 2, name: '의류' },
  { id: 3, name: '신발' },
  { id: 4, name: '가방' },
  { id: 5, name: '액세서리' },
  { id: 6, name: '디지털' },
];

function CategoryList() {
  return (
    <div className="rounded-xl p-8">
      <h2 className="text-lg font-bold mb-5">카테고리</h2>
      <hr />
      <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
        {categories.map((category) => (
          <li key={category.id} className="flex-shrink-0 lg:flex-shrink">
            <button className="w-full text-left mt-3 py-2">{category.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
