import { Watcher, WatcherMap } from '../types';
import { Map } from 'immutable';

export const watcherFromId = (groupId: string): WatcherMap =>
  Map<string, Watcher>().set(groupId, {
    title: 'Untitled',
    description: 'No description',
    groupId,
    delay: 10,
    active: false,
    createdOn: new Date(),
    timeNextAttempt: null
  });

export const pandaLinkValidators: Function[] = [
  (input: string) => /groupId=/.test(input),
  (input: string) => input.split('groupId=').length === 2,
  (input: string) => input.split('groupId=')[1].length === 30
];
