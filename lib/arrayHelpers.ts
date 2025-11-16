/**
 * Splits an array into chunks of a specified size
 * @param array - The array to chunk
 * @param chunkSize - The size of each chunk
 * @returns An array of chunked arrays
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  if (!Array.isArray(array)) return [];

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
