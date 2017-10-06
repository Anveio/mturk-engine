import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button } from '@shopify/polaris';
import {
  FetchStatusSummaryRequest,
  statusSummaryRequest
} from '../../actions/statusSummary';

export interface Handlers {
  readonly onRefreshDb: () => void;
}

class CalendarButtons extends React.PureComponent<Handlers, never> {
  public render() {
    return (
      <ButtonGroup>
        <Button onClick={this.props.onRefreshDb}>Refresh Database.</Button>
      </ButtonGroup>
    );
  }
}

const mapDispatch = (
  dispatch: Dispatch<FetchStatusSummaryRequest>
): Handlers => ({
  onRefreshDb: () => dispatch(statusSummaryRequest())
});

export default connect(null, mapDispatch)(CalendarButtons);
