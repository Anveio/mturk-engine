import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, QueueItem } from 'types';
import { ResourceList } from '@shopify/polaris';
import QueueItemInfo from './QueueItemInfo';
import { ReturnAction, returnHitRequest } from 'actions/return';
import { generateContinueWorkUrl } from 'utils/urls';
import { truncate } from 'utils/formatting';
import QueueCollapsibleInfo from './QueueCollapsibleInfo';
import {
  hitDatabaseToRequesterMap,
  numSubmittedHitsToRequester,
  numRejectedHitsToRequester
} from 'selectors/hitDatabase';
import { clickDidNotOccurOnActionButton } from 'utils/resourceList';
import { toggleQueueItemExpand } from 'actions/toggleExpand';
import { generateQueueCardExceptions } from 'utils/exceptions';

interface Props {
  readonly hit: QueueItem;
  readonly knownRequester: boolean;
  readonly requesterWorkHistorySize: number;
  readonly requesterRejectedHitsSize: number;
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
    const fresh = this.props.hit.fresh;
    if (clickDidNotOccurOnActionButton(e) && fresh) {
      this.props.onToggleExpand(this.props.hitId);
    }
  };

  public render() {
    const {
      hit,
      knownRequester,
      requesterRejectedHitsSize,
      requesterWorkHistorySize
    } = this.props;
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

    const exceptions = generateQueueCardExceptions({
      knownRequester,
      numSubmittedHits: requesterWorkHistorySize,
      numRejectedHits: requesterRejectedHitsSize
    });

    return (
      <React.Fragment>
        <div onClick={this.handleExpand}>
          <ResourceList.Item
            actions={actions}
            attributeOne={truncate(hit.requester.name, 40)}
            attributeTwo={truncate(hit.title, 120)}
            attributeThree={
              <QueueItemInfo reward={reward} timeLeftInSeconds={timeLeftInSeconds} />
              // tslint:disable-next-line:jsx-curly-spacing
            }
            exceptions={exceptions}
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
    knownRequester: hitDatabaseToRequesterMap(state).has(hit.requester.id),
    requesterWorkHistorySize: numSubmittedHitsToRequester(hit.requester.id)(
      state
    ),
    requesterRejectedHitsSize: numRejectedHitsToRequester(hit.requester.id)(
      state
    )
  };
};

const mapDispatch = (dispatch: Dispatch<ReturnAction>): Handlers => ({
  onReturn: (queueItem: QueueItem) => dispatch(returnHitRequest(queueItem)),
  onToggleExpand: (hitId: string) => dispatch(toggleQueueItemExpand(hitId))
});

export default connect(mapState, mapDispatch)(QueueItemCard);
