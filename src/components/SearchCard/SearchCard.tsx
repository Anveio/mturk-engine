import * as React from 'react';
import { connect } from 'react-redux';
import { SearchResult, BlockedHit, RootState, GroupId } from 'types';
import { ResourceList, Stack, DisableableAction } from '@shopify/polaris';
import { acceptHitRequestfromSearch } from 'actions/accept';
import { markHitAsRead } from 'actions/markAsRead';
import { blockSingleHit, unblockSingleHit } from 'actions/blockHit';
import { toggleSearchResultExpand } from 'actions/toggleExpand';
import InfoContainer from './InfoContainer';
import CollapsibleInfo from './CollapsibleInfo';
import { blockedHitFromSearchResult } from 'utils/blocklist';
import { searchResultsSelector } from 'selectors/index';
import { Text } from '@blueprintjs/core';
import RequesterName from './RequesterName';
import SearchResultExceptionList from './SearchResultExceptionList';
import { blockHitToast } from 'utils/toaster';

interface Props {
  readonly hit: SearchResult;
  readonly markedAsRead: boolean;
  readonly expanded: boolean;
}

interface OwnProps {
  readonly groupId: string;
}

interface Handlers {
  readonly onAccept: (hit: SearchResult) => void;
  readonly onToggleExpand: (groupId: GroupId) => void;
  readonly onHide: (hit: BlockedHit) => void;
  readonly onUndoHide: (groupId: GroupId) => void;
  readonly markHitAsRead: (groupId: string) => void;
}

class SearchCard extends React.Component<Props & OwnProps & Handlers, never> {
  private static generateNewResultHighlightStyle = (markedAsRead?: boolean) =>
    markedAsRead ? {} : { backgroundColor: '#EBF5FA' };

  private handleMarkingAsRead = () => {
    this.props.markHitAsRead(this.props.hit.groupId);
  };

  private markAsReadButton = () => ({
    content: 'Mark as Read',
    accessibilityLabel: 'Mark as Read',
    icon: 'view',
    onAction: this.handleMarkingAsRead
  });

  private readActions = () => [
    {
      content: 'Hide',
      icon: 'disable',
      onAction: () => {
        const blockedHit = blockedHitFromSearchResult(this.props.hit);
        this.props.onHide(blockedHit);
        blockHitToast(
          () => this.props.onUndoHide(blockedHit.groupId),
          blockedHit
        );
      }
    },
    {
      content: 'Accept',
      icon: 'add',
      primary: true,
      onAction: () => {
        this.props.onAccept(this.props.hit);
      }
    }
  ];

  private generateActions = (markedAsRead?: boolean): DisableableAction[] =>
    markedAsRead
      ? this.readActions()
      : [this.markAsReadButton(), ...this.readActions()];

  public render() {
    const { hit, expanded, onToggleExpand, markedAsRead } = this.props;
    const { groupId, requester } = hit;

    return (
      <React.Fragment>
        <div style={SearchCard.generateNewResultHighlightStyle(markedAsRead)}>
          <ResourceList.Item
            id={hit.groupId}
            onClick={onToggleExpand}
            shortcutActions={this.generateActions(markedAsRead)}
            ariaExpanded={expanded}
          >
            <Stack
              vertical={false}
              wrap={false}
              alignment="center"
              distribution="leading"
            >
              <Stack.Item>
                <RequesterName requesterName={hit.requester.name} />
              </Stack.Item>
              <Stack.Item fill>
                <Text ellipsize>{hit.title}</Text>
              </Stack.Item>
              <Stack.Item>
                <InfoContainer hit={hit} />
              </Stack.Item>
            </Stack>
            <SearchResultExceptionList hit={hit} />
          </ResourceList.Item>
        </div>

        <CollapsibleInfo
          groupId={groupId}
          requesterId={requester.id}
          requesterName={requester.name}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state: RootState, { groupId }: OwnProps): Props => ({
  hit: searchResultsSelector(state).get(groupId),
  expanded: state.expandedSearchResults.has(groupId),
  markedAsRead: state.markedAsReadGroupIds.has(groupId)
});

const mapDispatch: Handlers = {
  onAccept: acceptHitRequestfromSearch,
  onHide: blockSingleHit,
  onUndoHide: unblockSingleHit,
  onToggleExpand: toggleSearchResultExpand,
  markHitAsRead: markHitAsRead
};

export default connect(
  mapState,
  mapDispatch
)(SearchCard);
