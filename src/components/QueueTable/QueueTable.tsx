import * as React from 'react';
import { connect } from 'react-redux';
import { Card, ResourceList } from '@shopify/polaris';
import { RootState } from '../../types';
import { queueItemsIds } from '../../selectors/queue';
import { fetchQueueRequest } from '../../actions/queue';
import EmptyQueue from './EmptyQueue';
import QueueItemCard from '../QueueCard/QueueItemCard';
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

  componentDidUpdate(nextProps: Props & Handlers) {
    const { selectedTabIndex, onRefresh } = this.props;
    if (
      selectedTabIndex !== nextProps.selectedTabIndex &&
      selectedTabIndex === TabIndex.QUEUE
    ) {
      onRefresh();
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

const mapDispatch: Handlers = {
  onRefresh: fetchQueueRequest
};

export default connect(
  mapState,
  mapDispatch
)(QueueTable);
