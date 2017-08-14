import { Hit, Requester } from '../types';
import { calculateAllBadges } from './badges';
import { truncate } from './formatting';

type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export interface ExceptionDescriptor {
  status?: ExceptionStatus;
  title?: string;
  description?: string;
}

const generateExceptions = (groupId: string): ExceptionDescriptor[] => {
  return groupId.startsWith('[Error:groupId]-')
    ? [ { status: 'warning', title: 'You are not qualified.' } ]
    : [];
};

export const generateItemProps = (hit: Hit, requester: Requester | undefined) => {
  const { requesterName, reward, groupId, title } = hit;
  const badges = requester ? calculateAllBadges(requester) : [];

  const actions = [
    {
      content: 'Preview',
      external: true,
      url: `https://www.mturk.com/mturk/preview?groupId=${groupId}`
    },
    {
      content: 'Accept',
      primary: true,
      external: true,
      url: `https://www.mturk.com/mturk/previewandaccept?groupId=${groupId}`
    }
  ];

  return {
    attributeOne: truncate(title, 80),
    attributeTwo: truncate(requesterName, 45),
    attributeThree: reward,
    badges,
    actions,
    exceptions: generateExceptions(groupId)
  };
};
