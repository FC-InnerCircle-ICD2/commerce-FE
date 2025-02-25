'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

interface PageButtonProps {
  pageNumber: number;
  isActive: boolean;
  onClick: (pageNumber: number) => void;
}

const PageButton = ({ pageNumber, isActive, onClick }: PageButtonProps) => (
  <button
    onClick={() => onClick(pageNumber)}
    className={`w-10 h-10 rounded-lg ${isActive ? 'bg-[#A8C4D9] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
  >
    {pageNumber + 1}
  </button>
);

interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const NavigationButton = ({ onClick, disabled, children }: NavigationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg ${
      disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#A8C4D9] text-white hover:bg-[#8da6b8]'
    }`}
  >
    {children}
  </button>
);

const getVisiblePages = (currentPage: number, totalPages: number, maxVisiblePages: number) => {
  const halfVisible = Math.floor(maxVisiblePages / 2);
  let start = Math.max(currentPage - halfVisible, 0);
  const end = Math.min(start + maxVisiblePages - 1, totalPages - 1);

  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(end - maxVisiblePages + 1, 0);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('pageNumber', String(pageNumber));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <NavigationButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
        이전
      </NavigationButton>

      <div className="flex gap-2">
        <div className="hidden lg:flex gap-2">
          {getVisiblePages(currentPage, totalPages, 12).map((index) => (
            <PageButton key={index} pageNumber={index} isActive={currentPage === index} onClick={handlePageChange} />
          ))}
        </div>
        <div className="hidden md:flex lg:hidden gap-2">
          {getVisiblePages(currentPage, totalPages, 8).map((index) => (
            <PageButton key={index} pageNumber={index} isActive={currentPage === index} onClick={handlePageChange} />
          ))}
        </div>
        <div className="flex md:hidden gap-2">
          {getVisiblePages(currentPage, totalPages, 5).map((index) => (
            <PageButton key={index} pageNumber={index} isActive={currentPage === index} onClick={handlePageChange} />
          ))}
        </div>
      </div>

      <NavigationButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
        다음
      </NavigationButton>
    </div>
  );
}
