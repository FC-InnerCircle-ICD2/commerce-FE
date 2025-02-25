/**
 * @description 숫자 input받아서 천단위에 콤마 표기해주는 함수
 * @param x 천 단위 콤마 표기할 숫자 값
 * @returns 콤마 표기된 string값
 */
export function numberFormatting(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
