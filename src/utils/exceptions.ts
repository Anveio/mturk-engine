import { pluralizeHits, pluralize } from './formatting';
import { WorkerQualification } from '../types';

interface ExceptionDescriptor {
  status?: 'critical' | 'warning';
  title?: string;
  description: string;
  truncate?: boolean;
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
  readonly qualsRequired: WorkerQualification[];
}

const testAvailable = (quals: WorkerQualification[]): boolean =>
  quals.some(qual => !qual.userMeetsQualification && qual.hasTest);

const qualException = ({
  qualified,
  qualsRequired
}: QualificationExceptionData): ExceptionDescriptor | null =>
  !qualified
    ? {
        status: 'critical',
        title: `Not qualified `,
        description: `${testAvailable(qualsRequired) ? ' Test available' : ''}`
      }
    : null;

const knownRequesterException: ExceptionGenerator<RequesterExceptionData> = ({
  knownRequester,
  numSubmittedHits,
  numRejectedHits
}: RequesterExceptionData) =>
  knownRequester
    ? {
        title: `Requester in database `,
        description: `${numSubmittedHits} ${pluralizeHits(
          numSubmittedHits
        )}, ${numRejectedHits} ${pluralize('rejection', 'rejections')(
          numRejectedHits
        )}.`
      }
    : null;

const hitsInQueueException: ExceptionGenerator<number> = hitsInQueue =>
  hitsInQueue > 0
    ? {
        title: `${hitsInQueue} HIT${hitsInQueue > 1 ? 's' : ''} in queue`,
        description: ''
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
  ].filter(maybeException => !!maybeException) as ExceptionDescriptor[];

export const generateQueueCardExceptions = (
  requesterExceptionData: RequesterExceptionData
): ExceptionDescriptor[] =>
  [knownRequesterException(requesterExceptionData)].filter(
    maybeException => !!maybeException
  ) as ExceptionDescriptor[];
