export function buildUrl(base: string, params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();

  // 조건부로 파라미터 추가
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  }

  return `${base}?${searchParams.toString()}`;
}
