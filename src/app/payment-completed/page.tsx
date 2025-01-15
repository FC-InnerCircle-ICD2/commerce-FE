export default function PaymentCompleted() {
  return (
    <div className="">
      {/* TODO: 상단 네비 */}
      <div>주문/결제 {`>`} 완료</div>

      {/* TODO: 배경 컨테이너 적용 */}
      <div>

        {/* TODO: 주문 완료 정보 */}
        <div>
          <div>
            <span>주문완료 </span> 
            <span>되었습니다.</span>
          </div>
          <div>
            <div />
            <span>주문번호 </span>
            <span>253..</span>
            <div />
            <span>CSH(집)</span>
            <span>010-1000-2000</span>
            <span>서울 특별시 -- 101동 1004호</span>
            <div />
          </div>
          <button>홈으로</button>
        </div>

        {/* TODO: 추천 상품 */}
        <div>
          <div>이런 상품 어때요?</div>
          <div>캐러셀</div>
        </div>
      </div>
    </div>
  );
}
