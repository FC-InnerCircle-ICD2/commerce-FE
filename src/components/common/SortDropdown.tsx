import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SortDropdownProps {
  label: string;
  items: string[];
  onSelect: (item: string) => void;
}

export default function SortDropdown({ label, items, onSelect }: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex items-center gap-1 outline-none text-sm">
        <button className="px-3">
          {label}
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item} onSelect={() => onSelect(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}