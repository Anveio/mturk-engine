import * as React from 'react';
import { SearchItem } from '../../types';
import { ResourceList } from '@shopify/polaris';

export interface Props {
  readonly hit: SearchItem;
}

const QueueCard = ({ hit }: Props) => {
  return <ResourceList.Item attributeOne={hit.title} />;
};

export default QueueCard;
