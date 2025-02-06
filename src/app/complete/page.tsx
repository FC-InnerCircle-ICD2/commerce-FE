'use client';

import React from 'react';
import CompleteCardLists from './_components/CompleteCardLists';
import { Header } from '@/components/layout';
import Link from 'next/link';

export default function Complete() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center bg-white mt-10 mb-32">
        <div className="w-full p-6 md:p-8 bg-slate-50 border border-1 border-slate-300 flex flex-col items-center max-w-[1240px] sm:p-0 rounded-2xl max-sm:rounded-none">
          <div className="w-full max-w-[704px] flex flex-col items-center">
            <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">
              주문완료 <span className="font-normal">되었습니다</span>
            </h2>
            <div className="border-t border-gray-200 max-sm:w-[312px] w-[704px]" />
            <div className="py-6">
              <div className="flex items-center gap-3 pb-6">
                <h3 className="text-sm md:text-base font-medium">주문번호</h3>
                <p className="text-gray-700 text-sm md:text-base underline">20231234567890</p>
              </div>
              <div className="border-t border-gray-200 mb-6 max-sm:w-[312px] w-[704px]" />
              <p className="text-sm md:text-base font-medium mb-2">김지훈(집)</p>
              <p>010-1234-5678</p>
              <p className="text-gray-700 text-sm md:text-base">강원도 속초시 중앙로 123, APT 101동 1004호</p>
            </div>
            <div className="border-t border-gray-200 mb-8 max-sm:w-[312px] w-[704px]" />
            <Link
              href="/"
              className="text-center bg-slate-300 text-sky-950 w-[200px] max-sm:w-[312px] font-bold text-sm md:text-base py-3 rounded-lg hover:bg-slate-400 transition"
            >
              홈으로
            </Link>
          </div>
          <CompleteCardLists />
        </div>
      </div>
    </>
  );
}
