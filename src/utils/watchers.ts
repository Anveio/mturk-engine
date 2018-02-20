import { Watcher, SearchResult } from '../types';
import { formatAsCurrency } from './formatting';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';
import { WatcherTreeNode } from './tree';

export const createDefaultWatcher = (id: string): Watcher => ({
  groupId: id,
  delay: 5,
  description: '',
  folderId: DEFAULT_WATCHER_FOLDER_ID,
  title: 'Untitled Watcher',
  createdOn: new Date(0)
});

export const watcherFromId = (groupId: string): Watcher => ({
  title: '',
  description: 'ID: ' + groupId,
  groupId,
  delay: 10,
  createdOn: new Date(),
  folderId: DEFAULT_WATCHER_FOLDER_ID
});

export const watcherFromSearchResult = (hit: SearchResult): Watcher => ({
  title: hit.title,
  description: `${formatAsCurrency(hit.reward)} - ${hit.description}`,
  groupId: hit.groupId,
  delay: 5,
  createdOn: new Date(),
  folderId: DEFAULT_WATCHER_FOLDER_ID
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

type WatcherInputType = 'GROUP_ID' | 'WORKER' | 'LEGACY' | 'INVALID';

export const determineInputType = (input: string): WatcherInputType => {
  if (/\/projects\/(.*)\/tasks/gi.test(input)) {
    return 'WORKER';
  } else if (/groupId=(.*)/gi.test(input)) {
    return 'LEGACY';
  } else if (input.length === 30) {
    return 'GROUP_ID';
  } else {
    return 'INVALID';
  }
};

export const watchersArrayToTreeNodes = (
  watchers: Watcher[]
): WatcherTreeNode[] =>
  watchers.map((watcher: Watcher): WatcherTreeNode => ({
    id: watcher.groupId,
    iconName: 'document',
    label: watcher.title,
    kind: 'groupId'
  }));
