import { Map } from 'immutable';
import {} from '../constants/querySelectors';
import { QueueItem, QueueMap } from '../types';
import {
  selectHitContainers,
  parseStringProperty,
  parseCurrencyProperty
} from './parsing';
import {
  hitIdAnchor,
  hitTitleSelector,
  hitRewardSelector,
  hitRequesterNameSelector,
  timeLeftSelector
} from '../constants/querySelectors';
import * as v4 from 'uuid/v4';

export const parseQueuePage = (html: Document): QueueMap => {
  const hitContainers = selectHitContainers(html);
  const hitData = tabulateQueueData(hitContainers);
  return hitData;
};

export const parseHitIdQueue = (input: HTMLDivElement): string => {
  const hitIdElem = input.querySelector(hitIdAnchor);
  if (hitIdElem) {
    const href = hitIdElem.getAttribute('href') as string;
    return href.split('=')[1];
  } else {
    return '[Error:groupId]-' + v4();
  }
};

export const createQueueItem = (input: HTMLDivElement): QueueItem => ({
  title: parseStringProperty(hitTitleSelector, 'title')(input),
  hitId: parseHitIdQueue(input),
  requesterName: parseStringProperty(hitRequesterNameSelector, 'requesterName')(
    input
  ),
  reward: parseCurrencyProperty(hitRewardSelector)(input),
  timeLeft: parseStringProperty(timeLeftSelector, 'timeLeft')(input)
});

export const tabulateQueueData = (input: HTMLDivElement[]): QueueMap =>
  input.reduce(
    (map: QueueMap, hit: HTMLDivElement) =>
      map.set(parseHitIdQueue(hit), createQueueItem(hit)),
    Map<string, QueueItem>()
  );
