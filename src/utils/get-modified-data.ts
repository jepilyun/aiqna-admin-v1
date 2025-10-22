/**
 * Get only modified data
 * @param original - original data
 * @param updated - updated data
 * @returns modified data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOnlyModifiedData = <T extends Record<string, any>>(original: Partial<T>, updated: Partial<T>): Partial<T> => {
  const result: Partial<T> = {};

  Object.keys(updated).forEach((key) => {
    const typedKey = key as keyof T;
    const originalValue = original?.[typedKey];
    const updatedValue = updated?.[typedKey];

    // 날짜는 string 비교, 배열은 JSON 비교, 객체도 JSON 비교
    const isDifferent =
      Array.isArray(updatedValue) || typeof updatedValue === "object"
        ? JSON.stringify(originalValue) !== JSON.stringify(updatedValue)
        : originalValue !== updatedValue;

    if (isDifferent) {
      result[typedKey] = updatedValue;
    }
  });

  return result;
};
