export const APPLICATION_TITLE = 'Mturk Engine';

export type DATE_FORMAT = WORKER_DATE_FORMAT | LEGACY_DATE_FORMAT;

export const WORKER_DATE_FORMAT = 'YYYY-MM-DD';
export type WORKER_DATE_FORMAT = typeof WORKER_DATE_FORMAT;

export const LEGACY_DATE_FORMAT = 'MMDDYYYY';
export type LEGACY_DATE_FORMAT = typeof LEGACY_DATE_FORMAT;

/**
 * To be passed in as the argument for moment().format()
 * e.g. 'moment('10022017', 'MMDDYYYY').format('MOMENT_LOCALE')
 * yields 'Monday, October 2nd 2017' when MOMENT_LOCALE === 'dddd, MMMM Do YYYY'
 */
export const MOMENT_LOCALE = 'dddd, MMMM Do YYYY';

export const SQUARE_SIZE = 10;
export const MONTH_LABEL_GUTTER_SIZE = 4;
export const MILLISECONDS_IN_ONE_DAY = 86400000;
export const MONTH_LABEL_SIZE = SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE;
export const DAYS_IN_WEEK = 7;
export const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const HEATMAP_CSS_PREFIX = `react-calendar-heatmap-`;
export const SQUARE_BORDER_RADIUS = 1;
export const GUTTER_SIZE = 1;
export const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
export const WEEKDAY_LABEL_SIZE = 30;
export const SQUARE_SIZE_WITH_GUTTER = SQUARE_SIZE + GUTTER_SIZE;
export const WEEK_HEIGHT = DAYS_IN_WEEK * SQUARE_SIZE_WITH_GUTTER;

export const RESULTS_PER_PAGE = 25;
export const STATUS_DETAIL_RESULTS_PER_PAGE = 20;

export const DEFAULT_WATCHER_FOLDER_ID = '___UNSORTED_WATCHER_FOLDER___';

export const DEFAULT_NEW_WATCHER_FOLDER_NAME = 'New Folder';
export const WATCHER_FOLDER_NAME_SUFFIX_CONNECTOR = '-';

export const RESOURCE_LIST_ITEM_CLASS =
  'Polaris-ResourceList__Item Polaris-ResourceList__Item--focused';
