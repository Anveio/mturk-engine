import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import { QueueItem } from '../types';
import { truncate } from './formatting';

export const generateItemProps = (hit: QueueItem): ItemProps => {
  const { requesterName, title } = hit;
  return {
    attributeOne: truncate(requesterName, 40),
    attributeTwo: truncate(title, 75)
  };
};
