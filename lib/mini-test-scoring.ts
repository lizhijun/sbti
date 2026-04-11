/**
 * Simple tally scoring for mini-tests.
 * Each answer index is mapped to a result bucket via modulo,
 * and the bucket with the highest tally wins.
 */
export function computeMiniTestResult(
  answers: number[],
  resultCount: number,
): number {
  const tally = new Array(resultCount).fill(0);
  for (const optIdx of answers) {
    tally[optIdx % resultCount] += 1;
  }
  let maxIdx = 0;
  for (let i = 1; i < tally.length; i++) {
    if (tally[i] > tally[maxIdx]) maxIdx = i;
  }
  return maxIdx;
}
