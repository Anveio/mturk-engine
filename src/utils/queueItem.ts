import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import { QueueItem } from '../types';
import { truncate } from './formatting';

type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export interface ExceptionDescriptor {
  status?: ExceptionStatus;
  title?: string;
  description?: string;
}

// const generateExceptions = (groupId: string): ExceptionDescriptor[] => {
//   return groupId.startsWith('[Error:groupId]-')
//     ? [ { status: 'warning', title: 'You are not qualified.' } ]
//     : [];
// };

export const generateItemProps = (hit: QueueItem): ItemProps => {
  const { requesterName, title, reward } = hit;
  return {
    attributeOne: truncate(requesterName, 40),
    attributeTwo: truncate(title, 80),
    attributeThree: '$' + reward,
  };
};
