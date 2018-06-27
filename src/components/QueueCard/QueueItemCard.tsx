import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, QueueItem } from 'types';
import { ResourceList, Stack } from '@shopify/polaris';
import { returnHitRequest } from 'actions/return';
import QueueCollapsibleInfo from './QueueCollapsibleInfo';
import { toggleQueueItemExpand } from 'actions/toggleExpand';
import { generateContinueWorkUrl } from 'utils/urls';
import RequesterName from '../SearchCard/RequesterName';
import { Text } from '@blueprintjs/core';
import QueueItemInfo from './QueueItemInfo';
import QueueItemExceptionList from './QueueItemExceptionList';

interface Props {
  readonly hit: QueueItem;
  readonly expanded: boolean;
}

interface OwnProps {
  readonly hitId: string;
}

interface Handlers {
  readonly onReturn: (queueItem: QueueItem) => void;
  readonly onToggleExpand: (hitId: string) => void;
}

class QueueItemCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  public render() {
    const { hit } = this.props;
    const actions = [
      {
        content: 'Return',
        accessibilityLabel: 'Return',
        onClick: () => this.props.onReturn(hit)
      },
      {
        external: true,
        content: 'Work',
        accessibilityLabel: 'Work',
        url: generateContinueWorkUrl(hit)
      }
    ];
    return (
      <React.Fragment>
        <ResourceList.Item
          id={hit.assignmentId}
          onClick={this.props.onToggleExpand}
          shortcutActions={actions}
        >
          <Stack vertical={false} wrap={false} alignment="center">
            <Stack.Item>
              <RequesterName requesterName={hit.requester.name} />
            </Stack.Item>
            <Stack.Item fill>
              <Text ellipsize>{hit.title}</Text>
            </Stack.Item>
            <Stack.Item>
              <QueueItemInfo {...hit} />
            </Stack.Item>
          </Stack>
          <QueueItemExceptionList hit={hit} />
        </ResourceList.Item>
        <QueueCollapsibleInfo
          hitId={hit.hitId}
          requesterId={hit.requester.id}
          requesterName={hit.requester.name}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state: RootState, { hitId }: OwnProps): Props => ({
  hit: state.queue.get(hitId),
  expanded: state.expandedQueueItems.has(hitId)
});

const mapDispatch: Handlers = {
  onReturn: returnHitRequest,
  onToggleExpand: toggleQueueItemExpand
};

export default connect(mapState, mapDispatch)(QueueItemCard);
