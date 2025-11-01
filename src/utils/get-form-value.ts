/**
 * Get form value or null
 * @param key - key of form data
 * @param formData - form data
 * @returns string or null
 */
export const getFormValueOrNull = (
  key: string,
  formData: FormData,
): string | null => {
  const value = formData.get(key)?.toString().trim();

  return value && value.length > 0 ? value : null;
};
