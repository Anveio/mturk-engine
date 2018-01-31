import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { List } from 'immutable';
import {
  SearchResult,
  BlockedHit,
  RootState,
  AttributeWeights,
  RequesterAttributes,
  HitDatabaseEntry
} from '../../types';
import { ResourceList } from '@shopify/polaris';
import { AcceptAction, acceptHitRequestfromSearch } from '../../actions/accept';
import { MarkHitAsRead, markHitAsRead } from '../../actions/markAsRead';
import { BlockHitAction, blockHitGroup } from '../../actions/blockHitGroup';
import {
  ExpandAction,
  toggleSearchResultExpand
} from '../../actions/toggleExpand';
import InfoContainer from './InfoContainer';
import CollapsibleInfo from './CollapsibleInfo';
import { truncate } from '../../utils/formatting';
import { generateSearchCardExceptions } from '../../utils/exceptions';
import { generateTOpticonBadge } from '../../utils/badges';
import { blockedHitFactory } from '../../utils/blocklist';
import { calculateWeightedAverageScore } from '../../utils/turkopticon';
import { attributeWeightsSelector } from '../../selectors/turkopticon';
import {
  hitDatabaseToRequesterMap,
  getAllHitsSubmittedToRequester
} from '../../selectors/hitDatabase';
import { uniqueGroupIdsInQueueHistogram } from '../../selectors/queue';

export interface Props {
  readonly hit: SearchResult;
  readonly attributeWeights: AttributeWeights;
  readonly knownRequester: boolean;
  readonly requesterWorkHistory: List<HitDatabaseEntry>;
  readonly hitsInQueue: number;
}

export interface OwnProps {
  readonly groupId: string;
}

export interface Handlers {
  readonly onAccept: (hit: SearchResult) => void;
  readonly onToggleExpand: (hit: SearchResult) => void;
  readonly onHide: (hit: BlockedHit) => void;
  readonly markHitAsRead: (groupId: string) => void;
}

class SearchCard extends React.Component<Props & OwnProps & Handlers, never> {
  private static generateStyle = (markedAsRead?: boolean) =>
    markedAsRead ? {} : { backgroundColor: 'rgba(72, 175, 240, 0.15)' };

  static resourceListItemClass = 'Polaris-ResourceList__Item Polaris-ResourceList__Item--focused';

  static clickDidNotOccurOnActionButton = (
    e: React.MouseEvent<HTMLDivElement>
  ): boolean =>
    (e.target as Element).getAttribute('class') ===
    SearchCard.resourceListItemClass;

  private handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    if (SearchCard.clickDidNotOccurOnActionButton(e)) {
      this.props.onToggleExpand(this.props.hit);
    }
  };

  private handleMarkingAsRead = () => {
    if (!this.props.hit.markedAsRead) {
      this.props.markHitAsRead(this.props.hit.groupId);
    }
  };

  private unReadActions = () => [
    {
      content: 'Mark as Read',
      accessibilityLabel: 'Mark as Read',
      icon: 'view',
      onClick: this.handleMarkingAsRead
    }
  ];

  private readActions = () => [
    {
      content: 'Hide',
      accessibilityLabel: 'Hide',
      icon: 'disable',
      onClick: () => this.props.onHide(blockedHitFactory(this.props.hit))
    },
    {
      content: 'Add',
      accessibilityLabel: 'Add',
      icon: 'add',
      primary: true,
      onClick: () => this.props.onAccept(this.props.hit)
    }
  ];

  private generateActions = (markedAsRead: boolean) => {
    return markedAsRead
      ? this.readActions()
      : [...this.unReadActions(), ...this.readActions()];
  };

  public render() {
    const {
      hit,
      attributeWeights,
      knownRequester,
      hitsInQueue,
      requesterWorkHistory
    } = this.props;
    const { groupId, qualified, title, requester, markedAsRead } = hit;

    const attributeScores =
      ((requester.turkopticon &&
        requester.turkopticon.scores) as RequesterAttributes) || null;

    const exceptions = generateSearchCardExceptions(
      qualified,
      { knownRequester, numPreviouslySubmittedHits: requesterWorkHistory.size },
      hitsInQueue
    );

    return (
      <React.Fragment>
        <div
          onClick={this.handleExpand}
          style={SearchCard.generateStyle(!!markedAsRead)}
        >
          <ResourceList.Item
            actions={this.generateActions(!!markedAsRead)}
            exceptions={exceptions}
            badges={generateTOpticonBadge(
              attributeScores
                ? calculateWeightedAverageScore(
                    attributeScores,
                    attributeWeights
                  )
                : null
            )}
            attributeOne={truncate(requester.name, 40)}
            attributeTwo={truncate(title, 120)}
            attributeThree={
              <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />
              // tslint:disable-next-line:jsx-curly-spacing
            }
          />
        </div>

        <CollapsibleInfo
          groupId={groupId}
          knownRequester={knownRequester}
          requesterId={requester.id}
          requesterName={requester.name}
        />
      </React.Fragment>
    );
  }
}

type SearchTableAction =
  | AcceptAction
  | BlockHitAction
  | ExpandAction
  | MarkHitAsRead;

const mapState = (state: RootState, ownProps: OwnProps): Props => {
  const hit = state.search.get(ownProps.groupId);
  return {
    hit,
    attributeWeights: attributeWeightsSelector(state),
    knownRequester: !!hitDatabaseToRequesterMap(state).get(hit.requester.id),
    hitsInQueue:
      uniqueGroupIdsInQueueHistogram(state).get(ownProps.groupId) || 0,
    requesterWorkHistory: getAllHitsSubmittedToRequester(hit.requester.id)(
      state
    )
  };
};

const mapDispatch = (dispatch: Dispatch<SearchTableAction>): Handlers => ({
  onAccept: (hit: SearchResult) => {
    dispatch(acceptHitRequestfromSearch(hit));
  },
  onHide: (hit: BlockedHit) => {
    dispatch(blockHitGroup(hit));
  },
  onToggleExpand: (hit: SearchResult) => {
    dispatch(toggleSearchResultExpand(hit));
  },
  markHitAsRead: (groupId: string) => {
    dispatch(markHitAsRead(groupId));
  }
});

export default connect(mapState, mapDispatch)(SearchCard);
