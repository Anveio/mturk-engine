import * as React from 'react';
import { connect } from 'react-redux';
import { Card, DisplayText, Stack, Button } from '@shopify/polaris';
import { RootState } from 'types';
import { statusDetailRequest } from 'actions/statusDetail';
import { dateStringToLocaleDateString, stringToDate } from 'utils/dates';
import { LEGACY_DATE_FORMAT } from 'constants/dates';

interface Props {
  readonly selectedDate: string | null;
}

interface Handlers {
  readonly onRefresh: (date: Date, page: number, withToast: boolean) => void;
}

class DateDisplayCard extends React.PureComponent<Props & Handlers, never> {
  private static generateTitle = (selectedDate: string | null) =>
    selectedDate
      ? `${dateStringToLocaleDateString(selectedDate)}`
      : 'Select a date to see more information.';

  private handleRefresh = () => {
    const { selectedDate } = this.props;

    if (!!selectedDate) {
      this.props.onRefresh(
        stringToDate(selectedDate)(LEGACY_DATE_FORMAT),
        1,
        true
      );
    }
  };

  private dateSelectedMarkup = () => (
    <Card>
      <Card.Section>
        <Stack alignment="baseline">
          <DisplayText size="small">
            {DateDisplayCard.generateTitle(this.props.selectedDate)}
          </DisplayText>
          <Button plain onClick={this.handleRefresh}>
            Refresh this day's data
          </Button>
        </Stack>
      </Card.Section>
      {this.props.children}
    </Card>
  );

  private noDateSelectedMarkup = () => (
    <Card>
      <Card.Section>
        <DisplayText size="small">
          {DateDisplayCard.generateTitle(this.props.selectedDate)}
        </DisplayText>
      </Card.Section>
      {this.props.children}
    </Card>
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

const mapDispatch: Handlers = {
  onRefresh: statusDetailRequest
};

export default connect(
  mapState,
  mapDispatch
)(DateDisplayCard);
