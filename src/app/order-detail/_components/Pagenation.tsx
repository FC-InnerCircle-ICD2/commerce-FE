'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        className="px-4 py-2 rounded-lg bg-[#A8C4D9] text-white hover:bg-[#8da6b8] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        이전
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`w-10 h-10 rounded-lg ${currentPage + 1 === page ? 'bg-[#A8C4D9] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-4 py-2 rounded-lg bg-[#A8C4D9] text-white hover:bg-[#8da6b8] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage + 1 === totalPages}
      >
        다음
      </button>
    </div>
  );
}
