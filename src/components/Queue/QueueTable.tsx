import * as React from 'react';
import { Layout, Card, ResourceList, Stack, Button } from '@shopify/polaris';
import EmptyQueue from './EmptyQueue';
import QueueCard from './QueueItemCard';

export interface Props {
  readonly queueItemIds: string[];
}

export interface Handlers {
  readonly onRefresh: () => void;
}

class QueueTable extends React.PureComponent<Props & Handlers, never> {
  componentWillMount() {
    this.props.onRefresh();
  }

  public render() {
    const { queueItemIds, onRefresh } = this.props;

    return queueItemIds.length === 0 ? (
      <EmptyQueue onRefresh={onRefresh} />
    ) : (
      <Layout>
        <Layout.Section>
          <Stack vertical>
            <Card sectioned>
              <Button onClick={onRefresh}>Refresh queue.</Button>
            </Card>
            <Card>
              <ResourceList
                items={queueItemIds}
                renderItem={(hitId: string) => <QueueCard hitId={hitId} />}
              />
            </Card>
          </Stack>
        </Layout.Section>
      </Layout>
    );
  }
}

export default QueueTable;
