import * as React from 'react';
import { RootState, HeatMapValue } from '../../types';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { oneYearOfData } from '../../selectors/hitDatabase';
import CalendarHeatMap from './CalendarHeatMap';
import SelectedHitDate from '../CompletedHit/SelectedHitDate';
import { dateStringToLocaleDateString } from '../../utils/dates';

interface Props {
  readonly values: List<HeatMapValue>;
}

class Calendar extends React.PureComponent<Props, never> {
  static displayDates = (values: List<HeatMapValue>) => {
    return dateStringToLocaleDateString(values.get(0).date) + ' - Today';
  };

  public render() {
    return (
      <Card
        title={`HIT Database (${Calendar.displayDates(this.props.values)})`}
      >
        <Card.Section>
          <CalendarHeatMap values={this.props.values} />
        </Card.Section>
        <SelectedHitDate />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  values: oneYearOfData(state)
});

export default connect(mapState)(Calendar);
