import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from '@shopify/polaris';
import { NonIdealState } from '@blueprintjs/core';
import { RootState } from '../../types';
import {
  FetchStatusDetailRequest,
  statusDetailRequest
} from '../../actions/statusDetail';

interface Props {
  readonly selectedDate: string | null;
}

interface Handlers {
  readonly onRefresh: (dateString: string) => void;
}

class ActionButtons extends React.PureComponent<Props & Handlers, never> {
  private handleRefresh = () => {
    if (!!this.props.selectedDate) {
      this.props.onRefresh(this.props.selectedDate);
    }
  };

  public render() {
    return (
      <NonIdealState
        title="No activity recorded for this day."
        description="Gibberish"
        visual="pt-icon-calendar"
      >
        <Button onClick={this.handleRefresh}> Refresh</Button>
      </NonIdealState>
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedDate: state.selectedHitDbDate
});

const mapDispatch = (
  dispatch: Dispatch<FetchStatusDetailRequest>
): Handlers => ({
  onRefresh: (dateString: string) => dispatch(statusDetailRequest(dateString))
});

export default connect(mapState, mapDispatch)(ActionButtons);
