import { PersistedStateKey, ImmutablePersistedStateKey } from '../types';

export const PERSISTED_STATE_WHITELIST: PersistedStateKey[] = [
  'tab',
  'account',
  'hitBlocklist',
  'hitDatabase',
  'requesterBlocklist',
  'sortingOption',
  'searchOptions',
  'topticonSettings',
  'watchers',
  'watcherFolders',
  'audioSettingsV1',
  'dailyEarningsGoal',
  'notificationSettings',
  'searchAudioEnabled'
];

export const IMMUTABLE_PERSISTED_STATE_WHITELIST: ImmutablePersistedStateKey[] = [
  'hitBlocklist',
  'requesterBlocklist',
  'watchers',
  'watcherFolders',
  'hitDatabase'
];
