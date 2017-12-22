import { DashboardApiResponse } from '../worker-mturk-api';

/**
 * Returns an array of Mturk's URL encoded date strings for each day that has
 * HIT data.
 * @param html
 */
export const parseWorkedDates = (data: DashboardApiResponse): Date[] => {
  return data.daily_hit_statistics_overview
    .filter(overview => overview.submitted > 0)
    .map(overview => new Date(overview.date));
};
