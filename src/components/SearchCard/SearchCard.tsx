import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { SearchResult, BlockedHit, RootState } from '../../types';
import { ResourceList } from '@shopify/polaris';
import {} from '../types';
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
import { qualException } from '../../utils/exceptions';
import { generateTOpticonBadge } from '../../utils/badges';
import { blockedHitFactory } from '../../utils/blocklist';

export interface Props {
  readonly hit: SearchResult;
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

class SearchCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
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
    const { hit } = this.props;
    const { qualified, title, requester, markedAsRead } = hit;

    return (
      <div>
        <div
          onClick={this.handleExpand}
          style={SearchCard.generateStyle(!!markedAsRead)}
        >
          <ResourceList.Item
            actions={this.generateActions(!!markedAsRead)}
            exceptions={qualException(qualified)}
            badges={generateTOpticonBadge(requester.turkopticon)}
            attributeOne={truncate(requester.name, 40)}
            attributeTwo={truncate(title, 120)}
            attributeThree={
              <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />}
          />
        </div>
        <CollapsibleInfo open={!!hit.expanded} hit={this.props.hit} />
      </div>
    );
  }
}

type SearchTableAction =
  | AcceptAction
  | BlockHitAction
  | ExpandAction
  | MarkHitAsRead;

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.search.get(ownProps.groupId)
});

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
