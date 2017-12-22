import { Watcher, SearchResult } from '../types';

export const watcherFromId = (groupId: string): Watcher => ({
  title: '',
  description: 'ID: ' + groupId,
  groupId,
  delay: 10,
  createdOn: new Date(),
  timeNextAttempt: null
});

export const watcherFromSearchResult = (hit: SearchResult): Watcher => ({
  title: hit.title,
  description: hit.description,
  groupId: hit.groupId,
  delay: 10,
  createdOn: new Date(),
  timeNextAttempt: null
});

export const pandaLinkValidators: Function[] = [
  (input: string) => /groupId=/.test(input),
  (input: string) => input.split('groupId=').length === 2,
  (input: string) => input.split('groupId=')[1].length === 30
];

export const conflictsOnlyUseNewDateProp = (
  oldWatcher: Watcher,
  newWatcher: Watcher
): Watcher => ({
  ...oldWatcher,
  createdOn: newWatcher.createdOn
});
