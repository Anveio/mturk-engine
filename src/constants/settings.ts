import { PersistedStateKeys } from '../types';

export const PERSISTED_SETTINGS_WHITELIST: PersistedStateKeys[] = [
  'tab',
  'account',
  'hitBlocklist',
  'hitDatabase',
  'requesterBlocklist',
  'sortingOption',
  'searchOptions',
  'topticonSettings',
  'watchers',
  'audioSettingsV1',
  'dailyEarningsGoal'
];

export const IMMUTABLE_PERSISTED_SETTINGS_WHITELIST = [
  'hitBlocklist',
  'requesterBlocklist',
  'watchers',
  'hitDatabase'
];
