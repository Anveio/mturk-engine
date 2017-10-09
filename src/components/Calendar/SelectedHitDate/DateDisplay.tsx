import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card } from '@shopify/polaris';
import { Tooltip, Button } from '@blueprintjs/core';
import { RootState } from '../../../types';
import {
  FetchStatusDetailRequest,
  statusDetailRequest
} from '../../../actions/statusDetail';
import { dateStringToLocaleDateString } from '../../../utils/dates';

export interface Props {
  readonly selectedDate: string | null;
}

export interface Handlers {
  readonly onRefresh: (dateString: string) => void;
}

class DateDisplay extends React.PureComponent<Props & Handlers, never> {
  static generateTitle = (selectedDate: string | null) =>
    selectedDate
      ? `${dateStringToLocaleDateString(selectedDate)}`
      : 'Select a date to see more information.';

  private handleRefresh = () => {
    if (!!this.props.selectedDate) {
      this.props.onRefresh(this.props.selectedDate);
    }
  };

  private dateSelectedMarkup = () => (
    <Card.Section>
      <Tooltip content="Click to refresh this day's data.">
        <Button
          intent={0}
          rightIconName="refresh"
          className="pt-button pt-minimal"
          onClick={this.handleRefresh}
        >
          <span className="pt-ui-text-large">
            {DateDisplay.generateTitle(this.props.selectedDate)}
          </span>
        </Button>
      </Tooltip>
    </Card.Section>
  );

  private noDateSelectedMarkup = () => (
    <Card.Section>
      <span className="pt-ui-text-large">
        {DateDisplay.generateTitle(this.props.selectedDate)}
      </span>
    </Card.Section>
  );

  public render() {
    const { selectedDate } = this.props;
    return selectedDate
      ? this.dateSelectedMarkup()
      : this.noDateSelectedMarkup();
  }
}

const mapState = (state: RootState): Props => ({
  selectedDate: state.selectedHitDbDate
});

const mapDispatch = (
  dispatch: Dispatch<FetchStatusDetailRequest>
): Handlers => ({
  onRefresh: (dateString: string) =>
    dispatch(statusDetailRequest(dateString, 1, true))
});

export default connect(mapState, mapDispatch)(DateDisplay);
