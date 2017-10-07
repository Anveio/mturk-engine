import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Tooltip, Button, Position, Collapse } from '@blueprintjs/core';
import { Stack, Caption } from '@shopify/polaris';
import {
  FetchStatusSummaryRequest,
  statusSummaryRequest
} from '../../actions/statusSummary';
import { statusDetailRequest } from '../../actions/statusDetail';
import { todayFormatted } from '../../utils/dates';

export interface Handlers {
  readonly onRefreshDb: () => void;
  readonly onRefreshToday: () => void;
}

export interface State {
  readonly hovering: boolean;
}

class CalendarButtons extends React.PureComponent<Handlers, State> {
  readonly state: State = { hovering: false };

  static tooltipContent = `This will scan all HITs submitted in the last 45 days.`;
  static captionContent = `Refreshing your entire database more than once a minute may 
  temporarily prevent you from using MTurk for a few moments (at no other 
  penalty to your account). It's recommended you refresh your entire database 
  no more than once a minute and refresh just today's HITs as needed.`;

  private handleMouseEnter = () => {
    this.setState({ hovering: true });
  };

  private handleMouseLeave = () => {
    this.setState({ hovering: false });
  };

  // static conditionallyRenderCaption = (hovering: boolean) => {
  //   return hovering ? (
  //     <Collapse isOpen={this.state.}>
  //       <Caption>{CalendarButtons.captionContent}</Caption>
  //     </Collapse>
  //   ) : (
  //     <div />
  //   );
  // };

  public render() {
    const { tooltipContent } = CalendarButtons;
    return (
      <Stack vertical>
        <div className="pt-button-group pt-minimal">
          <Tooltip content={tooltipContent} position={Position.TOP_LEFT}>
            <Button
              iconName="pt-icon-database"
              onClick={this.props.onRefreshDb}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              Refresh Database
            </Button>
          </Tooltip>
          <Button
            iconName="pt-icon-calendar"
            onClick={this.props.onRefreshToday}
          >
            Refresh {new Date().toLocaleDateString()} (Today)
          </Button>
        </div>
        <Collapse isOpen={this.state.hovering}>
          <Caption>{CalendarButtons.captionContent}</Caption>
        </Collapse>
      </Stack>
    );
  }
}

const mapDispatch = (
  dispatch: Dispatch<FetchStatusSummaryRequest>
): Handlers => ({
  onRefreshDb: () => dispatch(statusSummaryRequest()),
  onRefreshToday: () => dispatch(statusDetailRequest(todayFormatted(), 1, true))
});

export default connect(null, mapDispatch)(CalendarButtons);
