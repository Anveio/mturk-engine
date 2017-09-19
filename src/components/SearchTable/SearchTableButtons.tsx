import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { MarkAllHitsAsRead, markAllHitsAsRead } from '../../actions/markAsRead';
import {
  CollapseAllResults,
  collapseAllResults
} from '../../actions/toggleExpand';
import { ButtonGroup, Button } from '@shopify/polaris';

export interface Handlers {
  readonly onMarkAllAsRead: () => void;
  readonly collapseAllResults: () => void;
}

class SearchTableButtons extends React.PureComponent<Handlers, never> {
  public render() {
    return (
      <ButtonGroup>
        <Button plain onClick={this.props.onMarkAllAsRead}>
          Mark all as read
        </Button>
        <Button plain onClick={this.props.collapseAllResults}>
          Collapse all
        </Button>
      </ButtonGroup>
    );
  }
}

type SearchTableButtonsAction = MarkAllHitsAsRead | CollapseAllResults;

const mapDispatch = (
  dispatch: Dispatch<SearchTableButtonsAction>
): Handlers => ({
  onMarkAllAsRead: () => dispatch(markAllHitsAsRead()),
  collapseAllResults: () => dispatch(collapseAllResults())
});

export default connect(null, mapDispatch)(SearchTableButtons);
