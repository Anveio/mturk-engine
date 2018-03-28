import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, ResourceList } from '@shopify/polaris';
import { RootState } from '../../types';
import { queueItemsIds } from '../../selectors/queue';
import { FetchQueueRequest, fetchQueueRequest } from '../../actions/queue';
import EmptyQueue from './EmptyQueue';
import QueueItemCard from '../Queue/QueueItemCard';
import QueueTableHeading from './QueueTableHeading';
import { TabIndex } from 'constants/enums';

interface Props {
  readonly selectedTabIndex: number;
  readonly queueItemIds: string[];
}

interface Handlers {
  readonly onRefresh: () => void;
}

interface State {
  readonly bannerVisible: boolean;
}

class QueueTable extends React.PureComponent<Props & Handlers, State> {
  public readonly state: State = { bannerVisible: true };

  componentWillReceiveProps({ selectedTabIndex }: Props & Handlers) {
    if (
      this.props.selectedTabIndex !== selectedTabIndex &&
      selectedTabIndex === TabIndex.QUEUE
    ) {
      this.props.onRefresh();
    }
  }

  public render() {
    const { queueItemIds, onRefresh } = this.props;

    return queueItemIds.length === 0 ? (
      <EmptyQueue onRefresh={onRefresh} />
    ) : (
      <Card>
        <QueueTableHeading
          queueSize={queueItemIds.length}
          onRefresh={onRefresh}
        />
        <ResourceList
          items={queueItemIds}
          renderItem={(hitId: string) => <QueueItemCard hitId={hitId} />}
        />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedTabIndex: state.tab,
  queueItemIds: queueItemsIds(state)
});

const mapDispatch = (dispatch: Dispatch<FetchQueueRequest>): Handlers => ({
  onRefresh: () => dispatch(fetchQueueRequest())
});

export default connect(mapState, mapDispatch)(QueueTable);
