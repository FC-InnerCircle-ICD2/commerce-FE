'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageNumber', String(pageNumber));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-[#A8C4D9] text-white hover:bg-[#8da6b8]'
        }`}
      >
        이전
      </button>
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`w-10 h-10 rounded-lg ${
              currentPage === index ? 'bg-[#A8C4D9] text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages - 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-[#A8C4D9] text-white hover:bg-[#8da6b8]'
        }`}
      >
        다음
      </button>
    </div>
  );
}
