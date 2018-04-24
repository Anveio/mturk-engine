import { createSelector } from 'reselect';
import { watcherTimersSelector } from '.';
import { getWatcherIdsAssignedToFolder } from './watcherFolders';

export const numActiveWatchersInFolder = (folderId: string) =>
  createSelector(
    [watcherTimersSelector, getWatcherIdsAssignedToFolder(folderId)],
    (watcherTimers, watcherIds) =>
      watcherIds.reduce(
        (acc, cur): number => (watcherTimers.has(cur) ? acc + 1 : acc),
        0
      )
  );
