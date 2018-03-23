import { Map } from 'immutable';
import { QueueMap, QueueItem } from '../types';
import { WorkerQueueItem } from '../worker-mturk-api';

export const tabulateQueueData = (input: WorkerQueueItem[]): QueueMap =>
  input.reduce(
    (map: QueueMap, hit: WorkerQueueItem) =>
      map.set(hit.assignment_id, createQueueItem(hit)),
    Map<string, QueueItem>()
  );

const createQueueItem = (input: WorkerQueueItem): QueueItem => ({
  title: input.project.title,
  hitId: input.assignment_id,
  groupId: input.project.hit_set_id,
  taskId: input.task_id,
  requester: {
    id: input.project.requester_id,
    name: input.project.requester_name
  },
  description: input.project.description,
  reward: input.project.monetary_reward.amount_in_dollars,
  timeLeftInSeconds: input.time_to_deadline_in_seconds,
  timeAllottedInSeconds: input.project.assignment_duration_in_seconds,
  batchSize: input.project.assignable_hits_count
});
