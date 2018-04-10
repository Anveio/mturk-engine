import { pluralize } from './formatting';
import { WorkerQualification } from '../types';

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
  readonly numSubmittedHits: number;
  readonly numRejectedHits: number;
}

interface QualificationExceptionData {
  readonly qualified: boolean;
  readonly qualifications: WorkerQualification[];
}

const testAvailable = (quals: WorkerQualification[]): boolean =>
  quals.some(qual => !qual.userMeetsQualification && qual.hasTest);

const qualException = ({
  qualified,
  qualifications
}: QualificationExceptionData): ExceptionDescriptor | null =>
  !qualified
    ? {
        status: 'critical',
        title: `Not qualified ${
          testAvailable(qualifications) ? ' - Test available' : ''
        }`
      }
    : null;

const knownRequesterException: ExceptionGenerator<RequesterExceptionData> = ({
  knownRequester,
  numSubmittedHits,
  numRejectedHits
}: RequesterExceptionData) =>
  knownRequester
    ? {
        status: 'neutral',
        title: `Requester in database`,
        description: `${numSubmittedHits} ${pluralize('HIT', 'HITs')(
          numSubmittedHits
        )}, ${numRejectedHits} rejected.`
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
  qualified: QualificationExceptionData,
  requesterExceptionData: RequesterExceptionData,
  hitsInQueue: number
): ExceptionDescriptor[] =>
  [
    qualException(qualified),
    knownRequesterException(requesterExceptionData),
    hitsInQueueException(hitsInQueue)
  ].filter(maybeException => maybeException !== null) as ExceptionDescriptor[];
