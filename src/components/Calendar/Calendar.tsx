import * as React from 'react';
import { RootState, HeatMapValue } from '../../types';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { oneYearOfData } from '../../selectors/hitDatabase';
import CalendarHeatMap from './CalendarHeatMap';
import { dateStringToLocaleDateString } from '../../utils/dates';
import CalendarButtons from '../Buttons/CalendarButtons';

interface Props {
  readonly values: List<HeatMapValue>;
}

class Calendar extends React.PureComponent<Props, never> {
  private static displayDates = (values: List<HeatMapValue>) => {
    return dateStringToLocaleDateString(values.get(0).date) + ' - Today';
  };

  public render() {
    return (
      <Card
        title={`HIT Database (${Calendar.displayDates(this.props.values)})`}
      >
        <Card.Section>
          <CalendarHeatMap />
          <CalendarButtons />
        </Card.Section>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  values: oneYearOfData(state)
});

export default connect(mapState)(Calendar);
