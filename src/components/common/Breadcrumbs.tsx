import Image from 'next/image';
import { ChevronRightIcon,ChevronDownIcon} from '@heroicons/react/20/solid';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Breadcrumbs() {
  return (
    <div className="flex items-center justify-between p-4 it bg-slate-50 border border-slate-300 rounded-xl">
      <Breadcrumb className="flex items-center gap-1 list-none">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="w-4 h-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex items-center gap-1">
              <button className="px-2">
                남성의류
                 <Image src="/assets/dropdownDown.svg" width={20} height={20} alt="dropdown arrow" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>상의</DropdownMenuItem>
              <DropdownMenuItem>하의</DropdownMenuItem>
              <DropdownMenuItem>아우터</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="w-4 h-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex items-center gap-1">
              <button className="px-2">
                아우터 
                <Image src="/assets/dropdownDown.svg" width={20} height={20} alt="dropdown arrow" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>코트</DropdownMenuItem>
              <DropdownMenuItem>자켓</DropdownMenuItem>
              <DropdownMenuItem>패딩</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </Breadcrumb>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex items-center gap-1">
          <button className="px-3">
            낮은 가격순
             <ChevronDownIcon className="w-6 h-6" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>높은 가격순</DropdownMenuItem>
          <DropdownMenuItem>판매 많은순</DropdownMenuItem>
          <DropdownMenuItem>등록순</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
