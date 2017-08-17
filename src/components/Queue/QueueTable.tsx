import * as React from 'react';
import { HitMap } from '../../types';
import { Card, ResourceList } from '@shopify/polaris';
import EmptyQueue from '../../containers/EmptyQueue';
import QueueItem from './QueueItem';

export interface Props {
  readonly queue: HitMap;
}

const QueueTable = ({ queue }: Props) => {
  return queue.isEmpty() ? (
    <EmptyQueue />
  ) : (
    <Card>
      <ResourceList
        items={queue.toArray()}
        renderItem={hit => <QueueItem hit={hit} />}
      />
    </Card>
  );
};

export default QueueTable;
