const calculateTimeBetweenStartAndEnd = (
  startTime: number,
  dateNumNextSearch: number
): number => {
  return Math.max(dateNumNextSearch - startTime, 0);
};

const calculateProgress = (timeLeft: number, total: number): number => {
  if (total === 0 || timeLeft <= 0) {
    return 1;
  }

  return 1 - timeLeft / total;
};

/**
 * Returns a number between 0 and 1.
 * @param startTime
 * @param now
 * @param endTime
 */
export const calculateSpinnerProgress = (
  startTime: number,
  now: number,
  endTime: number
) =>
  calculateProgress(
    endTime - now,
    calculateTimeBetweenStartAndEnd(startTime, endTime)
  );
