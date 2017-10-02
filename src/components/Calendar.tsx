import * as React from 'react';
import { RootState, HeatMapValue } from '../types';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { oneYearOfData } from '../selectors/hitDatabase';
import CalendarHeatmap from './CustomCalendar';
import { List } from 'immutable'

interface Props {
  readonly values: List<HeatMapValue>;
}

interface State {
  readonly hoveredElem?: SVGRectElement;
}

class Calendar extends React.PureComponent<Props, State> {
  state: State = { hoveredElem: undefined };

  public render() {
    return (
      <Card sectioned>
        <CalendarHeatmap
          endDate={new Date()}
          numDays={365}
          values={this.props.values}
          gutterSize={1}
        />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  values: oneYearOfData(state)
});

export default connect(mapState)(Calendar);
