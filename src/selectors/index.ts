import { RootState } from '../types';

export const hitDatabaseSelector = (state: RootState) => state.hitDatabase;

export const hitBlocklistSelector = (state: RootState) => state.hitBlocklist;

export const requesterBlocklistSelector = (state: RootState) =>
  state.requesterBlocklist;

export const notiticationSettingsSelector = (state: RootState) =>
  state.notificationSettings;

export const queueSelector = (state: RootState) => state.queue;

export const searchResultSelector = (state: RootState) => state.search;

export const selectedHitDbDateSelector = (state: RootState) =>
  state.selectedHitDbDate;

export const sortOptionSelector = (state: RootState) => state.sortingOption;

export const uploadedStateSelector = (state: RootState) => state.uploadedState;

export const watcherSelector = (state: RootState) => state.watchers;

export const turkopticonSettingsSelector = (state: RootState) =>
  state.topticonSettings;
