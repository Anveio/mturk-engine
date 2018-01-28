import { pluralize } from './formatting';

type ExceptionStatus = 'neutral' | 'warning' | 'critical';
interface ExceptionDescriptor {
  readonly status?: ExceptionStatus;
  readonly title?: string;
  readonly description?: string;
}

interface ExceptionGenerator<T = boolean> {
  (condition: T): ExceptionDescriptor | null;
}

interface RequesterExceptionData {
  readonly knownRequester: boolean;
  readonly numPreviouslySubmittedHits: number;
}

const qualException = (qualified: boolean): ExceptionDescriptor | null =>
  !qualified ? { status: 'critical', title: 'Not qualified' } : null;

const knownRequesterException: ExceptionGenerator<RequesterExceptionData> = ({
  knownRequester,
  numPreviouslySubmittedHits
}: RequesterExceptionData) =>
  knownRequester
    ? {
        status: 'neutral',
        title: `Requester in database - ${numPreviouslySubmittedHits} ${pluralize(
          'HIT',
          'HITs',
          numPreviouslySubmittedHits
        )} found`
      }
    : null;

const hitsInQueueException: ExceptionGenerator<number> = hitsInQueue =>
  hitsInQueue > 0
    ? {
        status: 'neutral',
        title: `${hitsInQueue} HIT${hitsInQueue > 1 ? 's' : ''} in queue`
      }
    : null;

export const generateSearchCardExceptions = (
  qualified: boolean,
  requesterExceptionData: RequesterExceptionData,
  hitsInQueue: number
): ExceptionDescriptor[] =>
  [
    qualException(qualified),
    knownRequesterException(requesterExceptionData),
    hitsInQueueException(hitsInQueue)
  ].filter(maybeException => maybeException !== null) as ExceptionDescriptor[];
