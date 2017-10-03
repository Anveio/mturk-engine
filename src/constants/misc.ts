export const DATE_FORMAT = 'MMDDYYYY';

/**
 * To be passed in as the argument for moment().format()
 * e.g. 'moment('10022017', 'MMDDYYYY').format('MOMENT_LOCALE')
 * yields 'Oct 2, 2017' when MOMENT_LOCALE === 'll'
 */
export const MOMENT_LOCALE = 'll';

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

export const GUTTER_SIZE = 1;
export const DAY_LABELS = [ '', 'Mon', '', 'Wed', '', 'Fri', '' ];
export const WEEKDAY_LABEL_SIZE = 30;
