import * as React from 'react';
import { Set } from 'immutable';
import { connect } from 'react-redux';
import { markAllHitsAsRead } from '../../actions/markAsRead';
import { collapseAllSearchResults } from '../../actions/toggleExpand';
import SortingMenu from './SortingMenu';
import { ButtonGroup, Button } from '@shopify/polaris';
import ToggleSearchAudioButton from '../Buttons/ToggleSearchAudioButton';
import { GroupId, RootState } from 'types';
import { filteredResultsGroupIdSet } from 'selectors/search';

interface Props {
  readonly resultsIds: Set<GroupId>;
  readonly atLeastOneExpanded: boolean;
}

interface Handlers {
  readonly onMarkAllAsRead: (hitIds: Set<GroupId>) => void;
  readonly collapseAllResults: () => void;
}

class SearchTableButtons extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <ButtonGroup>
        {this.props.atLeastOneExpanded && (
          <Button plain onClick={this.props.collapseAllResults}>
            Collapse all
          </Button>
        )}
        <Button
          plain
          onClick={() => this.props.onMarkAllAsRead(this.props.resultsIds)}
        >
          Mark all as read
        </Button>
        <SortingMenu />
        <ToggleSearchAudioButton />
      </ButtonGroup>
    );
  }
}

const mapDispatch: Handlers = {
  onMarkAllAsRead: markAllHitsAsRead,
  collapseAllResults: collapseAllSearchResults
};

const mapState = (state: RootState): Props => ({
  resultsIds: filteredResultsGroupIdSet(state),
  atLeastOneExpanded: state.expandedSearchResults.size !== 0
});

export default connect(
  mapState,
  mapDispatch
)(SearchTableButtons);
