import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, QueueItem } from 'types';
import { ResourceList } from '@shopify/polaris';
import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import QueueItemInfo from './QueueItemInfo';
import { ReturnAction, returnHitRequest } from 'actions/return';
import { generateContinueWorkUrl } from 'utils/urls';
import { truncate } from 'utils/formatting';
import QueueCollapsibleInfo from './QueueCollapsibleInfo';
import { hitDatabaseToRequesterMap } from 'selectors/hitDatabase';
import { clickDidNotOccurOnActionButton } from 'utils/resourceList';
import { toggleQueueItemExpand } from 'actions/toggleExpand';

interface Props {
  readonly hit: QueueItem;
  readonly knownRequester: boolean;
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
  private handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickDidNotOccurOnActionButton(e)) {
      this.props.onToggleExpand(this.props.hitId);
    }
  };

  private static generateItemProps = (hit: QueueItem): ItemProps => {
    const { requester, title } = hit;
    return {
      attributeOne: truncate(requester.name, 40),
      attributeTwo: truncate(title, 120)
    };
  };

  public render() {
    const { hit, knownRequester } = this.props;
    const { reward, timeLeftInSeconds } = hit;
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
        <div onClick={this.handleExpand}>
          <ResourceList.Item
            actions={actions}
            {...QueueItemCard.generateItemProps(hit)}
            attributeThree={
              <QueueItemInfo reward={reward} timeLeft={timeLeftInSeconds} />
              // tslint:disable-next-line:jsx-curly-spacing
            }
          />
        </div>
        <QueueCollapsibleInfo
          hitId={hit.hitId}
          knownRequester={knownRequester}
          requesterId={hit.requester.id}
          requesterName={hit.requester.name}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => {
  const hit = state.queue.get(ownProps.hitId);
  return {
    hit,
    knownRequester: !!hitDatabaseToRequesterMap(state).get(hit.requester.id)
  };
};

const mapDispatch = (dispatch: Dispatch<ReturnAction>): Handlers => ({
  onReturn: (queueItem: QueueItem) => dispatch(returnHitRequest(queueItem)),
  onToggleExpand: (hitId: string) => dispatch(toggleQueueItemExpand(hitId))
});

export default connect(mapState, mapDispatch)(QueueItemCard);
