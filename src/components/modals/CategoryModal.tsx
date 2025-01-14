import { useCategory } from '@/hooks/queries/useCategory';
import CategoryForm from '../common/CategoryForm';
import { useEffect, useRef } from 'react';

type Props = {
  handleClose: () => void;
};

export default function CategoryModal({ handleClose }: Props) {
  const { categories } = useCategory();
  const modalRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 핸들러
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={modalRef} className="w-[310] h-[500] absolute right-0 top-[75] z-50 p-[15] shadow-lg rounded-lg">
      {categories && <CategoryForm categories={categories} />}
    </div>
  );
}
