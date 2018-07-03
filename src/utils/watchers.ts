import { Watcher, WatcherStatistics, HumanIntelligenceTask } from '../types';
import { formatAsUsd } from './formatting';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';
import { WatcherTreeNode } from './tree';
import { executeRegex } from './parsing';

type DefaultWatcherFields =
  | 'delay'
  | 'description'
  | 'folderId'
  | 'title'
  | 'stopAfterFirstSuccess'
  | 'playSoundAfterSuccess';

export const watcherDefaults: Pick<Watcher, DefaultWatcherFields> = {
  delay: 5,
  description: '',
  folderId: DEFAULT_WATCHER_FOLDER_ID,
  title: 'Untitled Watcher',
  stopAfterFirstSuccess: true,
  playSoundAfterSuccess: false
};

export const createWatcherWithInfo = (
  hit: HumanIntelligenceTask,
  date: Date
): Watcher => ({
  ...watcherDefaults,
  groupId: hit.groupId,
  title: hit.title,
  description: generateWatcherDescription(hit),
  createdOn: date
});

export const pandaLinkValidators: ((i: string) => boolean)[] = [
  (input: string) => /groupId=/.test(input),
  (input: string) => input.split('groupId=').length === 2,
  (input: string) => input.split('groupId=')[1].length === 30
];

export const parseGroupId = (input: string): string =>
  input.split('groupId=')[1];

export const projectIdFromProjectLinkRegex = /\/projects\/(.*?)\//i;

export const parseProjectIdFromProjectLink = (input: string) =>
  executeRegex(input)(projectIdFromProjectLinkRegex);

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
    icon: 'document',
    label: watcher.title,
    kind: 'groupId'
  }));

export const defaultWatcherStats: WatcherStatistics = {
  failures: 0,
  successes: 0
};

const generateWatcherDescription = (hit: HumanIntelligenceTask): string =>
  `${formatAsUsd(hit.reward)} - ${hit.description} - Requester: ${hit.requester
    .name} (ID: ${hit.requester.id})`;
