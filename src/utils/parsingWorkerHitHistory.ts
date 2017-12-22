import { DashboardApiResponse } from '../worker-mturk-api';

export const parseWorkedDates = (data: DashboardApiResponse): Date[] => {
  return data.daily_hit_statistics_overview
    .filter(overview => overview.submitted > 0)
    .map(overview => new Date(overview.date));
};
