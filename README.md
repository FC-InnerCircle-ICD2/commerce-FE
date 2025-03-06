<div align="center">
<h1>감성카트 🍀</h1>
다양한 카테고리의 상품을 제공하는 종합적인 쇼핑 플랫폼으로, 사용자 친화적인 인터페이스를 통해 효율적인 쇼핑 경험을 제공합니다.
</div>

## 🍀 주요 기능
### 상품
- **상품 목록 및 상세 조회**: 사용자가 다양한 상품을 목록으로 확인하고, 각 상품의 상세 정보를 볼 수 있습니다.
- **상품 검색, 필터, 정렬**: 사용자가 원하는 상품을 쉽게 찾을 수 있도록 검색 기능과 필터링, 정렬 옵션을 제공합니다.
- **장바구니**: 사용자가 관심 있는 상품을 임시로 저장하고, 이후 구매할 수 있는 기능을 제공합니다.

### 주문
- **주문하기**: 사용자가 선택한 상품을 구매할 수 있는 주문 프로세스를 제공합니다.
- **주문 내역 조회**: 사용자가 이전에 구매한 상품의 주문 내역을 확인할 수 있는 기능을 제공합니다.

### 기타
- **회원가입 및 로그인 (소셜 로그인)**: 사용자가 쉽게 계정을 생성하고, 소셜 로그인 기능을 통해 간편하게 로그인할 수 있습니다.
- **반응형**: 다양한 디바이스에서 최적화된 사용자 경험을 제공하는 반응형 디자인을 적용했습니다.

## 🍀 기술 스택
- 프레임워크 및 라이브러리: Next.js
- 프로그래밍 언어: TypeScript
- 스타일링: Tailwind CSS, Shadcn
- 상태 관리 및 데이터 처리: Tanstack Query
- 폼 관리 및 유효성 검사: React Hook Form, Zod

## 🍀 설치 및 실행 방법
```bash
# 저장소 클론
git clone https://github.com/FC-InnerCircle-ICD2/commerce-FE.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🍀 프로젝트 구조

```
src/
├── api/                # API 호출 관련 파일들 (백엔드 통신)
├── app/                # Next.js App Router 구조
│   ├── api/            # Next.js API Routes
│   ├── cart/           # 장바구니 페이지
│   ├── category/       # 카테고리 페이지
│   ├── products/       # 상품 관련 페이지
│   ├── purchase/       # 구매 페이지
│   ├── review/         # 리뷰 페이지
│   ├── layout.tsx      # 레이아웃 컴포넌트
│   └── page.tsx        # 메인 페이지
├── assets/             # 이미지 등 정적 자산
├── components/         # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   ├── home/           # 홈페이지 관련 컴포넌트
│   ├── layout/         # 레이아웃 관련 컴포넌트
│   ├── modals/         # 모달 컴포넌트
│   ├── skeletons/      # 로딩 스켈레톤 컴포넌트
│   └── ui/             # UI 컴포넌트
├── constants/          # 상수 정의
├── hooks/              # 커스텀 훅
│   ├── common/         # 공통 훅
│   ├── mutate/         # 데이터 변경 관련 훅
│   └── queries/        # 데이터 조회 관련 훅
├── lib/                # 유틸리티 라이브러리
├── mock/               # 목업 데이터 및 MSW 설정
├── providers/          # React 컨텍스트 프로바이더
├── store/              # 상태 관리 저장소
├── types/              # 타입 정의
└── utils/              # 유틸리티 함수
```

## 🍀 팀 멤버 및 역할

|주산들|김지훈|이선민|최석호|
|-----|------|------|------|
|<img src='https://github.com/sandeulju.png' width='150'>|<img src='https://github.com/kigpand.png' width='150'>|<img src='https://github.com/hellohailie.png' width='150'>|<img src='https://github.com/SeokHoChoi.png' width='150'>|
|[@sandeulju](https://github.com/sandeulju)|[@kigpand](https://github.com/kigpand)|[@HelloHailie](https://github.com/HelloHailie)|[@SeokHoChoi](https://github.com/SeokHoChoi)|
|주문/결제|메인페이지, 상품 상세|상품 리스트|로그인|
