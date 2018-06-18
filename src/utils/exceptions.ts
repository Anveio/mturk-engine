import { ExceptionListProps, IconProps } from '@shopify/polaris';
import { pluralizeHits, pluralize } from './formatting';
import { WorkerQualification } from '../types';

interface ExceptionDescriptor {
  /** Set the color of the icon and title for the given item. */
  status?: 'critical' | 'warning';
  /** Icon displayed by the list item */
  icon?: IconProps['source'];
  /** Text displayed beside the icon */
  title?: string;
  /** Text displayed for the item */
  description?: string;
  /** Should the description be truncated at end of line */
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
        icon: 'dispute',
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
        icon: 'notes',
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
): ExceptionListProps => ({
  items: [
    qualException(qualified),
    knownRequesterException(requesterExceptionData),
    hitsInQueueException(hitsInQueue)
  ].filter(maybeException => !!maybeException) as ExceptionDescriptor[]
});

export const generateQueueCardExceptions = (
  requesterExceptionData: RequesterExceptionData
): ExceptionListProps => ({
  items: [knownRequesterException(requesterExceptionData)].filter(
    maybeException => !!maybeException
  ) as ExceptionDescriptor[]
});
