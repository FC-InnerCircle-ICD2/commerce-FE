type Props = {
  size: number;
};

export default function LoadingSpinner({ size }: Props) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-[${size}px] h-[${size}px] border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin`}
      ></div>
    </div>
  );
}
