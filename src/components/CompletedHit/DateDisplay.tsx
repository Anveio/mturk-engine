import * as React from 'react';
import { connect } from 'react-redux';
import { Card, DisplayText } from '@shopify/polaris';
import { RootState } from '../../types';
import { dateStringToLocaleDateString } from '../../utils/dates';

export interface Props {
  readonly selectedDate: string | null;
}

class DateDisplay extends React.PureComponent<Props, never> {
  static generateTitle = (selectedDate: string | null) =>
    selectedDate
      ? `${dateStringToLocaleDateString(selectedDate)}`
      : 'Select a date to see more information.';

  public render() {
    const { selectedDate } = this.props;
    return (
      <Card.Section>
        <DisplayText size="small">
          {DateDisplay.generateTitle(selectedDate)}
        </DisplayText>
      </Card.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedDate: state.selectedHitDbDate
});

export default connect(mapState)(DateDisplay);
