import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // 프로덕션 환경에서는 MSW 관련 모듈을 완전히 제외
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw', alias: false });
        config.resolve.alias.push({ name: '@/mock/browser', alias: false });
      } else {
        config.resolve.alias['msw'] = false;
        config.resolve.alias['@/mock/browser'] = false;
      }
    } else if (isServer) {
      // 개발 환경의 서버 사이드에서는 브라우저 버전 제외
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/browser', alias: false });
      } else {
        config.resolve.alias['msw/browser'] = false;
      }
    } else {
      // 개발 환경의 클라이언트 사이드에서는 노드 버전 제외
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/node', alias: false });
      } else {
        config.resolve.alias['msw/node'] = false;
      }
    }
    return config;
  },
};

export default nextConfig;
