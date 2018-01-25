type ExceptionStatus = 'neutral' | 'warning' | 'critical';
interface ExceptionDescriptor {
  readonly status?: ExceptionStatus;
  readonly title?: string;
  readonly description?: string;
}

interface ExceptionGenerator<T = boolean> {
  (condition: T): ExceptionDescriptor | null;
}

const qualException = (qualified: boolean): ExceptionDescriptor | null =>
  !qualified ? { status: 'critical', title: 'Not qualified' } : null;

const knownRequesterException: ExceptionGenerator = requesterInDatabase =>
  requesterInDatabase
    ? {
        status: 'neutral',
        title: 'Requester in database'
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
  requesterInDatabase: boolean,
  hitsInQueue: number
): ExceptionDescriptor[] =>
  [
    qualException(qualified),
    knownRequesterException(requesterInDatabase),
    hitsInQueueException(hitsInQueue)
  ].filter(maybeException => maybeException !== null) as ExceptionDescriptor[];
