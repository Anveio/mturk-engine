import {
  RequesterInfo,
  WorkerQualification,
  HumanIntelligenceTask
} from '../types';
import {
  baseTaskUrl,
  baseRequesterUrl,
  turkopticonBaseUrl,
  turkopticonTwoBaseUrl
} from '../constants/urls';
import { formatAsCurrency } from './formatting';
import { QualificationComparator } from '../worker-mturk-api';
import { generateAcceptUrl } from './urls';
import { secondsToMinutes } from './dates';

const requesterSearchBaseUrl =
  'https://www.mturk.com/mturk/searchbar?requesterId=';

export const generateHwtfUrl = (hit: HumanIntelligenceTask): string => `
https://www.reddit.com/r/HITsWorthTurkingFor/submit?selftext=true&title=${generateHwtfTitle(
  hit
)}&text=${hwtfText}
`;

const generateHwtfTitle = (hit: HumanIntelligenceTask): string => {
  return `US - ${hit.title} - ${hit.requester.name} - ${formatAsCurrency(
    hit.reward
  )}/X:XX - (${generateQuals(hit.qualsRequired)})`;
};

const generateQuals = (quals: WorkerQualification[]): string =>
  quals.length > 0
    ? quals.map(qual => qualificationToSentence(qual)).join(', ')
    : 'None';

const hwtfText =
  // tslint:disable-next-line:max-line-length
  `**Placeholder (Delete this when you're done):** Remember to fill in the (X:XX) with the approximate time it took you to complete the HIT. Mturk Engine assumes that the HIT is US by default but if international workers are allowed to work on this HIT, change "US" to "ICA". For more information, see HWTF's contribution guidelines at https://www.reddit.com/r/HITsWorthTurkingFor/wiki/index#wiki_contributing_to_the_community_pool
  `;

export const generateMarkdownExport = (hit: HumanIntelligenceTask): string => {
  const {
    title,
    groupId,
    requester,
    reward,
    timeAllottedInSeconds,
    batchSize,
    description,
    qualsRequired
  } = hit;

  const quals =
    qualsRequired.length === 0 ? 'None' : generateQuals(qualsRequired);

  // tslint:disable:max-line-length
  return `**Title:** [${title}](${generateAcceptUrl(groupId)})  
    **Worker:** [Preview](${baseTaskUrl}${groupId}/tasks) | [Accept](${baseTaskUrl}${groupId}/tasks/accept_random) | [Requester](${baseRequesterUrl}${
    requester.id
  }/projects)  
    **Requester:** [${requester.name}](${requesterSearchBaseUrl}${requester.id})
    **[[TO](${turkopticonBaseUrl}${
    requester.id
  }) / [TO2](${turkopticonTwoBaseUrl}${requester.id})] : ${ratingsToWords(
    requester.turkopticon
  )}**
    **Reward:** ${formatAsCurrency(reward)} 
    **Duration:** ${secondsToMinutes(timeAllottedInSeconds)} minutes.  
    **Available:** ${batchSize}  
    **Description:** ${description}
    **Requirements:** ${quals}`;
};

export const qualificationToSentence = (qual: WorkerQualification): string =>
  `${qual.name} ${qualComparatorToWords(
    qual.comparator
  )} ${qual.qualificationValues.join(', ')}.`;

const qualComparatorToWords = (comparator: QualificationComparator): string => {
  switch (comparator) {
    case 'EqualTo':
      return 'is equal to';
    case 'NotEqualTo':
      return 'is not';
    case 'GreaterThan':
      return 'is greater than';
    case 'GreaterThanOrEqualTo':
      return 'is not less than';
    case 'LessThan':
      return 'is less than';
    case 'LessThanOrEqualTo':
      return 'is not greater than';
    case 'In':
      return 'is one of';
    case 'DoesNotExist':
      return 'does not exist';
    default:
      return comparator;
  }
};

const ratingsToWords = (turkopticon?: RequesterInfo): string => {
  if (!turkopticon) {
    return 'No Data';
  }

  const {
    numReviews,
    numTosFlags,
    scores: { comm, fair, fast, pay }
  } = turkopticon;
  return `[Pay: ${pay}] [Fast: ${fast}] [Comm: ${comm}] [Fair: ${fair}] [Reviews: ${numReviews}] [ToS: ${numTosFlags}]`;
};
