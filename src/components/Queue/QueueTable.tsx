import * as React from 'react';
import { QueueMap } from '../../types';
import { Card, ResourceList, Stack, Button } from '@shopify/polaris';
import EmptyQueue from './EmptyQueue';
import QueueCard from './QueueCard';

export interface Props {
  readonly queue: QueueMap;
}

export interface Handlers {
  readonly onRefresh: () => void;
  readonly onReturn: (hitId: string) => void;
}

class QueueTable extends React.PureComponent<Props & Handlers, never> {
  componentWillMount() {
    this.props.onRefresh();
  }

  render() {
    const { queue, onRefresh, onReturn } = this.props;

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
  }
}

export default QueueTable;
