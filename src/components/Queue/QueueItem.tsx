import * as React from 'react';
import { QueueItem } from '../../types';
import { ResourceList } from '@shopify/polaris';

export interface Props {
  readonly hit: QueueItem;
}

const QueueCard = ({ hit }: Props) => {
  const { title, requesterName, reward } = hit;

  const itemProps = {
    attributeOne: requesterName,
    attributeTwo: title,
    attributeThree: reward
  };

  return <ResourceList.Item {...itemProps} />;
};

export default QueueCard;
