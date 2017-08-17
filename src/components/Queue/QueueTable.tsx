import * as React from 'react';
import { HitMap } from '../../types';
import { Card, ResourceList } from '@shopify/polaris';
import QueueItem from './QueueItem';

export interface Props {
  readonly queue: HitMap;
}

const QueueTable = ({ queue }: Props) => {
  return (
    <Card>
      <ResourceList
        items={queue.toArray()}
        renderItem={hit => <QueueItem hit={hit} />}
      />
    </Card>
  );
};

export default QueueTable;
