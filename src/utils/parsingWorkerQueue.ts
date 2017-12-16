import { Map } from 'immutable';
import { QueueMap, QueueItem } from '../types';
import { WorkerQueueItem, QueueApiResponse } from '../worker-mturk-api';
import { getPageReactProps } from './parsing';

export const parseQueuePage = (html: Document): QueueMap => {
  const queueItems = queuePageToQueueItemArray(html);
  return tabulateQueueData(queueItems);
};

const queuePageToQueueItemArray = (html: Document): WorkerQueueItem[] => {
  const pageReactProps = getPageReactProps(html);

  if (!pageReactProps) {
    throw new Error('No data found on the requested queue page.');
  }

  try {
    const searchResultsData = JSON.parse(pageReactProps) as QueueApiResponse;
    return searchResultsData.bodyData;
  } catch (e) {
    throw new Error('Error parsing react data props string.');
  }
};

const createQueueItem = (input: WorkerQueueItem): QueueItem => ({
  title: input.project.title,
  hitId: input.assignment_id,
  groupId: input.project.hit_set_id,
  taskId: input.task_id,
  requesterName: input.project.requester_name,
  reward: input.project.monetary_reward.amount_in_dollars,
  timeLeftInSeconds: input.time_to_deadline_in_seconds
});

const tabulateQueueData = (input: WorkerQueueItem[]): QueueMap =>
  input.reduce(
    (map: QueueMap, hit: WorkerQueueItem) =>
      map.set(hit.assignment_id, createQueueItem(hit)),
    Map<string, QueueItem>()
  );
