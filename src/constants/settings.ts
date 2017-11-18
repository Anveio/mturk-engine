import { PersistedStateKeys, ImmutablePersistedStateKeys } from '../types';

export const PERSISTED_STATE_WHITELIST: PersistedStateKeys[] = [
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

export const IMMUTABLE_PERSISTED_STATE_WHITELIST: ImmutablePersistedStateKeys[] = [
  'hitBlocklist',
  'requesterBlocklist',
  'watchers',
  'hitDatabase'
];
