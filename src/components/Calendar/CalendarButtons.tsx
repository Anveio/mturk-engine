import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Tooltip, Button } from '@blueprintjs/core';
import {
  FetchStatusSummaryRequest,
  statusSummaryRequest
} from '../../actions/statusSummary';

export interface Handlers {
  readonly onRefreshDb: () => void;
}

class CalendarButtons extends React.PureComponent<Handlers, never> {
  static tooltipContent = `This will produce many requests to MTurk.`;

  public render() {
    return (
      <Tooltip content={CalendarButtons.tooltipContent}>
        <Button
          iconName="pt-icon-database"
          className="pt-button pt-minimal"
          onClick={this.props.onRefreshDb}
        >
          Click to refresh your database.
        </Button>
      </Tooltip>
    );
  }
}

const mapDispatch = (
  dispatch: Dispatch<FetchStatusSummaryRequest>
): Handlers => ({
  onRefreshDb: () => dispatch(statusSummaryRequest())
});

export default connect(null, mapDispatch)(CalendarButtons);
