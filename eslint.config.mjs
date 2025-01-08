import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
);

// ignore: 무시되는 디렉토리 dist 디렉토리 내의 파일의 linting을 무시한다.
// extends 기본 설정 확장
// files: 파일 대상 확장자가 .ts 또는 .tsx인 모든 파일에 이 설정이 적용
// languageOptions: 언어 옵션 ecmaVersion: 2020: ECMAScript 2020 문법을 사용하도록 설정합니다.
// globals: 코드의 실행 환경 설정 브라우저 환경에서 제공되는 전역 변수(window, document 등)를 인식하도록 설정
// plugins: 플러그인 플러그인을 먼저 적용하고 extends나 rules 에서 직접 적용한다.
// rules: 규칙 설정 규칙을 설정하여 코드 스타일을 강제하거나 경고를 띄운다.
