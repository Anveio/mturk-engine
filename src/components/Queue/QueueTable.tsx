import * as React from 'react';
import { SearchMap } from '../../types';
import { Card, ResourceList, FormLayout, Button } from '@shopify/polaris';
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
    <Card>
      <Card.Section>
        <FormLayout>
          <Button>Refresh queue.</Button>
        </FormLayout>
      </Card.Section>
      <ResourceList
        items={queue.toArray()}
        renderItem={hit => <QueueItem hit={hit} />}
      />
    </Card>
  );
};

export default QueueTable;
