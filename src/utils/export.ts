import { SearchResult } from '../types';
import {
  acceptBaseUrl,
  baseTaskUrlWorker,
  baseRequeserUrlWorker,
  turkopticonBaseUrl
} from '../constants/urls';
import { formatAsCurrency } from './formatting';

const contactBaseUrl = 'https://www.mturk.com/mturk/contact?requesterId=';
const requesterSearchBaseUrl =
  'https://www.mturk.com/mturk/searchbar?requesterId=';

// const removExtraneousWhiteSpace = (el: string): string => {
//   return el.replace(/\s\s+/g, ' ');
// };

export const generateHwtfUrl = (hit: SearchResult): string => `
https://www.reddit.com/r/HITsWorthTurkingFor/submit?selftext=true&title=${generateHwtfTitle(
  hit
)}&text=${hwtfText}
`;

const generateHwtfTitle = (hit: SearchResult): string => {
  return `US - ${hit.title} - ${hit.requester.name} - ${formatAsCurrency(
    hit.reward
  )}/X:XX - (${generateQuals([])})`;
};

const generateQuals = (quals: string[]): string =>
  quals.length > 0 ? quals.slice(0, 3).join(', ') : 'None';

const hwtfText =
  // tslint:disable-next-line:max-line-length
  `**Placeholder (Delete this when you're done):** Remember to fill in the (X:XX) with the approximate time it took you to complete the HIT. Mturk Engine assumes that the HIT is US by default but if international workers are allowed to work on this HIT, change "US" to "ICA". For more information, see HWTF's contribution guidelines at https://www.reddit.com/r/HITsWorthTurkingFor/wiki/index#wiki_contributing_to_the_community_pool
  `;

export const generateMarkdownExport = (hit: SearchResult): string => {
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

  const quals = qualsRequired.length === 0 ? 'None' : qualsRequired;

  if (requester.turkopticon) {
    const {
      reviews,
      tos_flags,
      attrs: { comm, fair, fast, pay }
    } = requester.turkopticon;

    // tslint:disable:max-line-length
    return `**Title:** [${title}](${acceptBaseUrl}${groupId})  
    **Worker:** [Preview](${baseTaskUrlWorker}${groupId}/tasks) | [Accept](${baseTaskUrlWorker}${groupId}/tasks/accept_random) | [Requester](${baseRequeserUrlWorker}${
      requester.id
    }/projects)  
    **Requester:** [${requester.name}](${requesterSearchBaseUrl}${
      requester.id
    }) ([Contact](${contactBaseUrl}${requester.id}))  
    **[TO](${turkopticonBaseUrl}${
      requester.id
    }):** [Pay: ${pay}] [Fast: ${fast}] [Comm: ${comm}] [Fair: ${fair}] [Reviews: ${reviews}] [ToS: ${tos_flags}]  
    **Reward:** $${reward} 
    **Duration:** ${timeAllottedInSeconds}  
    **Available:** ${batchSize}  
    **Description:** ${description}
    **Requirements:** ${quals}`;
  } else {
    return `**Title:** [${title}](${acceptBaseUrl}${groupId})  
    **Worker:** [Preview](${baseTaskUrlWorker}${groupId}/tasks) | [Accept](${baseTaskUrlWorker}${groupId}/tasks/accept_random) | [Requester](${baseRequeserUrlWorker}${
      requester.id
    }/projects)  
    **Requester:** [${requester.name}](${requesterSearchBaseUrl}${
      requester.id
    }) [${requester.id}] ([Contact](${contactBaseUrl}${requester.id}))  
    **[TO](No data)]  
    **Reward:** $${reward} 
    **Duration:** ${timeAllottedInSeconds}  
    **Available:** ${batchSize}  
    **Description:** ${description}
    **Requirements:** ${quals}`;
  }
};
