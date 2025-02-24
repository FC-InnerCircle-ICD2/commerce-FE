import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.resolve.alias))
        // server일시 browser를 제외 시킨다
        config.resolve.alias.push({ name: 'msw/browser', alias: false });
      else config.resolve.alias['msw/browser'] = false;
    } else {
      if (Array.isArray(config.resolve.alias)) config.resolve.alias.push({ name: 'msw/node', alias: false });
      else config.resolve.alias['msw/node'] = false;
    }
    return config;
  },
    // 환경 변수 설정 추가
    env: {
      NEXT_PUBLIC_TEMP_TOKEN: process.env.NEXT_PUBLIC_TEMP_TOKEN,
    },
    // Edge Runtime에 환경 변수 노출
  serverExternalPackages: ["some-package"], // ✅ 변경된 옵션 사용
};

export default nextConfig;
