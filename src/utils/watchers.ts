import { Watcher, WatcherMap } from '../types';
import { Map } from 'immutable';

export const watcherFromId = (groupId: string): WatcherMap =>
  Map<string, Watcher>().set(groupId, {
    groupId,
    delay: 10,
    active: false,
    createdOn: new Date()
  });
