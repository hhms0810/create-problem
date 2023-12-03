/**
 * 배열 랜덤 요소를 찾기 위한 함수
 * @param array
 * @returns
 */
export const getRandomElement = <T>(array: T[]): T | null => {
  const length = array.length;
  if (length) {
    const randomIndex = Math.floor(Math.random() * length);
    return array[randomIndex];
  }

  return null;
};
