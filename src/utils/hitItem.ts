import { Hit, Requester } from '../types';
import { generateBadges } from './badges';
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
  const { requesterName, groupId, title } = hit;

  const actions = [
    {
      icon: 'view',
      external: true,
      url: `https://www.mturk.com/mturk/preview?groupId=${groupId}`
    },
    {
      primary: true,
      external: true,
      icon: 'add',
      url: `https://www.mturk.com/mturk/previewandaccept?groupId=${groupId}`
    }
  ];

  return {
    attributeOne: requesterName,
    attributeTwo: truncate(title, 80),
    badges: generateBadges(requester),
    actions,
    exceptions: generateExceptions(groupId)
  };
};
