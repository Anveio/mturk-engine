import { DAYS_IN_WEEK } from './dates';

export const APPLICATION_TITLE = 'Mturk Engine';
export const MTURK_URL_ENCODING_FORMAT = 'RFC1738';

export const SQUARE_SIZE = 10;
export const MONTH_LABEL_GUTTER_SIZE = 4;

export const MONTH_LABEL_SIZE = SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE;

export const HEATMAP_CSS_PREFIX = `react-calendar-heatmap-`;
export const SQUARE_BORDER_RADIUS = 1;
export const GUTTER_SIZE = 1;
export const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
export const WEEKDAY_LABEL_SIZE = 30;
export const SQUARE_SIZE_WITH_GUTTER = SQUARE_SIZE + GUTTER_SIZE;
export const WEEK_HEIGHT = DAYS_IN_WEEK * SQUARE_SIZE_WITH_GUTTER;

export const DATABASE_RESULTS_PER_PAGE = 20;
export const DATABASE_FILTER_RESULTS_PER_PAGE = 20;
export const STATUS_DETAIL_RESULTS_PER_PAGE = 20;

export const DEFAULT_WATCHER_FOLDER_ID = '___UNSORTED_WATCHER_FOLDER___';

export const DEFAULT_NEW_WATCHER_FOLDER_NAME = 'New Folder';
export const WATCHER_FOLDER_NAME_SUFFIX_CONNECTOR = '-';

export const RESOURCE_LIST_ITEM_CLASS =
  'Polaris-ResourceList__Item Polaris-ResourceList__Item--focused';
