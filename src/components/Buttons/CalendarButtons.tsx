import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Tooltip, Button, Position, Collapse, AnchorButton } from '@blueprintjs/core';
import { Stack, Caption } from '@shopify/polaris';
import { RootState } from 'types';
import {
  FetchStatusSummaryRequest,
  statusSummaryRequest
} from 'actions/statusSummary';
import { statusDetailRequest } from 'actions/statusDetail';

export interface Props {
  readonly waitingForHitDbRefresh: boolean;
}

export interface Handlers {
  readonly onRefreshDb: () => void;
  readonly onRefreshToday: () => void;
}

export interface State {
  readonly hovering: boolean;
}

class CalendarButtons extends React.PureComponent<Props & Handlers, State> {
  readonly state: State = { hovering: false };

  private static tooltipContent = `This will scan all HITs submitted in the last 45 days.`;
  private static captionContent = `Refreshing your entire database more than once a minute may 
  temporarily prevent you from using MTurk for a few moments (at no other 
  penalty to your account). It's recommended you refresh your entire database 
  no more than once a minute and refresh just today's HITs as needed.`;

  private handleMouseEnter = () => {
    this.setState({ hovering: true });
  };

  private handleMouseLeave = () => {
    this.setState({ hovering: false });
  };

  public render() {
    const { tooltipContent, captionContent } = CalendarButtons;
    return (
      <Stack vertical>
        <div className="pt-button-group pt-minimal">
          <Tooltip
            content={tooltipContent}
            position={Position.TOP_LEFT}
            isOpen={this.state.hovering}
          >
            <AnchorButton
              loading={this.props.waitingForHitDbRefresh}
              icon="database"
              onClick={this.props.onRefreshDb}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              Refresh Database
            </AnchorButton>
          </Tooltip>
          <Button icon="refresh" onClick={this.props.onRefreshToday}>
            Refresh {new Date().toLocaleDateString()} (Today)
          </Button>
        </div>
        <Collapse isOpen={this.state.hovering}>
          <Caption>{captionContent}</Caption>
        </Collapse>
      </Stack>
    );
  }
}

const mapState = (state: RootState): Props => ({
  waitingForHitDbRefresh: state.waitingForHitDbRefresh
});

const mapDispatch = (
  dispatch: Dispatch<FetchStatusSummaryRequest>
): Handlers => ({
  onRefreshDb: () => dispatch(statusSummaryRequest()),
  onRefreshToday: () => dispatch(statusDetailRequest(new Date(), 1, true))
});

export default connect(mapState, mapDispatch)(CalendarButtons);
