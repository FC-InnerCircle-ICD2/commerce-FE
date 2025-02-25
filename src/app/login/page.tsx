async function getToken() {
  try {
    const response = await fetch('http://3.37.67.153:8082/api/v1/auth/uri/naver');
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Login() {
  await getToken();
  // 뒤에 http://localhost:3000 은 로그인시 리다이렉트 되는 경로입니다. 추후 배포시에는 저희 도메인이 들어가면 될듯합니다.
  // 그리고 리다이렉트 경로 변경 테스트 하실려면 로그인 된거 꼭 로그아웃하고 진행하셔야 합니다
  const NAVER_LOGIN_URL =
    'https://auth-api.emmotional-cart.click/oauth2/authorization/naver?redirect_uri=http://localhost:3000';

  return (
    <a href={NAVER_LOGIN_URL}>
      <button>Login with Naver</button>
    </a>
  );
}
