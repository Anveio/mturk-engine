import * as React from 'react';
import { RootState, HeatMapValue } from '../../types';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { oneYearOfData } from '../../selectors/hitDatabase';
import CalendarHeatMap from './CalendarHeatMap';
import { List } from 'immutable';

interface Props {
  readonly values: List<HeatMapValue>;
  readonly selectedDateData: {};
}

class Calendar extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Card>
        <Card.Section title="HIT Database">
          <CalendarHeatMap
            endDate={new Date()}
            numDays={365}
            values={this.props.values}
            gutterSize={1}
          />
        </Card.Section>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  values: oneYearOfData(state),
  selectedDateData: {}
});

export default connect(mapState)(Calendar);
