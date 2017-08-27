import { Record } from 'immutable';

export interface QueueItemParams {
  readonly title: string;
  readonly requesterName: string;
  readonly hitId: string;
  readonly reward: string;
  readonly timeLeft: string;
}

const defaultQueueItem: QueueItemParams = {
  hitId: '',
  requesterName: '',
  reward: '',
  timeLeft: '',
  title: ''
};

const QueueItemRecord = Record({ defaultQueueItem });

export class QueueItem extends QueueItemRecord {
  readonly hitId: string;
  readonly requesterName: string;
  readonly reward: string;
  readonly timeLeft: string;
  readonly title: string;
}
