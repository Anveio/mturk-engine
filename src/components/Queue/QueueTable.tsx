import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Layout, Card, ResourceList, Stack, Button } from '@shopify/polaris';
import { RootState } from '../../types';
import { queueItemsIds } from '../../selectors/queue';
import { FetchQueueRequest, fetchQueueRequest } from '../../actions/queue';
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

const mapState = (state: RootState): Props => ({
  queueItemIds: queueItemsIds(state)
});

const mapDispatch = (dispatch: Dispatch<FetchQueueRequest>): Handlers => ({
  onRefresh: () => dispatch(fetchQueueRequest())
});

export default connect(mapState, mapDispatch)(QueueTable);
