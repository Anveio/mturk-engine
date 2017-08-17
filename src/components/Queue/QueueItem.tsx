import * as React from 'react';
import { Hit } from '../../types';
import { ResourceList } from '@shopify/polaris';

export interface Props {
  readonly hit: Hit;
}

const QueueCard = ({ hit }: Props) => {
  return <ResourceList.Item attributeOne={hit.title} />;
};

export default QueueCard;
