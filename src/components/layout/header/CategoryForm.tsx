'use client';

type Props = {
  handleCloseForm: () => void;
};

export default function CategoryForm({ handleCloseForm }: Props) {
  return <div onClick={handleCloseForm}>close</div>;
}
