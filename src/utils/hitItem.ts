import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import { SearchItem, Requester } from '../types';
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

export const generateItemProps = (
  hit: SearchItem,
  requester: Requester | undefined
): ItemProps => {
  const { requesterName, groupId, title } = hit;

  const actions = [
    // {
    //   icon: 'view',
    //   external: true,
    //   url: `https://www.mturk.com/mturk/preview?groupId=${groupId}`
    // },
    {
      primary: true,
      external: true,
      content: 'Accept',
      accessibilityLabel: 'Accept',
      icon: 'add',
      url: `https://www.mturk.com/mturk/previewandaccept?groupId=${groupId}`
    }
  ];

  return {
    attributeOne: truncate(requesterName, 40),
    attributeTwo: truncate(title, 80),
    badges: generateBadges(requester),
    actions,
    exceptions: generateExceptions(groupId)
  };
};
