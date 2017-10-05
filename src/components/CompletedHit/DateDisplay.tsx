import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, Stack, DisplayText, Button } from '@shopify/polaris';
import { RootState } from '../../types';
import {
  FetchStatusDetailRequest,
  statusDetailRequest
} from '../../actions/statusDetail';
import { dateStringToLocaleDateString } from '../../utils/dates';

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

  public render() {
    const { selectedDate } = this.props;
    return (
      <Card.Section>
        <Stack alignment="baseline">
          <Button plain onClick={this.handleRefresh} icon="refresh" />
          <DisplayText size="small">
            {DateDisplay.generateTitle(selectedDate)}
          </DisplayText>
        </Stack>
      </Card.Section>
    );
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
