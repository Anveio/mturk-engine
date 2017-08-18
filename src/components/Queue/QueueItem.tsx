import * as React from 'react';
import { QueueItem } from '../../types';
import { ResourceList } from '@shopify/polaris';
import { generateItemProps } from '../../utils/queueItem';

export interface Props {
  readonly hit: QueueItem;
}

const QueueCard = ({ hit }: Props) => {
  return <ResourceList.Item {...generateItemProps(hit)} />;
};

export default QueueCard;
