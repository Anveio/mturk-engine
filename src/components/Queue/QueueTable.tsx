import * as React from 'react';
import { SearchMap } from '../../types';
import { Card, ResourceList, Stack, Button } from '@shopify/polaris';
import EmptyQueue from './EmptyQueue';
import QueueCard from './QueueCard';

export interface Props {
  readonly queue: SearchMap;
}

export interface Handlers {
  readonly onRefresh: () => void;
  readonly onReturn: (hitId: string) => void;
}

const QueueTable = ({ queue, onRefresh, onReturn }: Props & Handlers) => {
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
          renderItem={hit => <QueueCard hit={hit} onReturn={onReturn} />}
        />
      </Card>
    </Stack>
  );
};

export default QueueTable;
