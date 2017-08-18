import * as React from 'react';
import { SearchMap } from '../../types';
import { Card, ResourceList } from '@shopify/polaris';
import EmptyQueue from '../../containers/EmptyQueue';
import QueueItem from './QueueItem';

export interface Props {
  readonly queue: SearchMap;
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
