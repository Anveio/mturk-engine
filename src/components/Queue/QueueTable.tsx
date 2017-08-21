import * as React from 'react';
import { SearchMap } from '../../types';
import { Card, ResourceList, Stack, Button } from '@shopify/polaris';
import EmptyQueue from './EmptyQueue';
import QueueItem from './QueueItem';

export interface Props {
  readonly queue: SearchMap;
}

export interface Handlers {
  readonly onRefresh: () => void;
}

const QueueTable = ({ queue, onRefresh }: Props & Handlers) => {
  return queue.isEmpty() ? (
    <EmptyQueue onRefresh={onRefresh} />
  ) : (
    <Stack vertical>
      <Card sectioned>
        <Button onClick={onRefresh}>Refresh queue.</Button>
      </Card>
      <Card>
        <ResourceList
          items={queue.toArray()}
          renderItem={hit => <QueueItem hit={hit} />}
        />
      </Card>
    </Stack>
  );
};

export default QueueTable;
