import * as React from 'react';
import { RootState, HeatMapValue } from '../types';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { formatForCalendar } from '../selectors/hitDatabase';
// import { Popover } from '@blueprintjs/core';
import CalendarHeatmap from './CustomCalendar';

interface Props {
  readonly values: HeatMapValue[];
}

interface State {
  readonly hoveredElem?: SVGRectElement;
}

class Calendar extends React.PureComponent<Props, State> {
  state: State = { hoveredElem: undefined };

  private onClick = (value: number) => {
    console.log(value);
  };

  // private handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
  //   // if (clickDidNotOccurOnActionButton(e)) {
  //   //   this.props.onToggleExpand(this.props.hit);
  //   // }
  //   let maybeSvgElem = e.target;

  //   if (maybeSvgElem instanceof Node && maybeSvgElem.nodeName === 'rect') {
  //     this.setState(() => maybeSvgElem);
  //     console.log(this.state);
  //   } else {
  //     this.setState(() => ({}));
  //     console.log(this.state);
  //   }
  // };

  // static titleForValue = (value: HeatMapValue | null) => {
  //   console.log(value && value.date);
  //   // return value !== null
  //   //   ? `$${value.count} earned on ${value.date.toLocaleDateString()}`
  //   //   : null;
  // };

  public render() {
    return (
      <Card sectioned>
        <CalendarHeatmap
          endDate={new Date()}
          numDays={365}
          values={this.props.values}
          onClick={this.onClick}
          gutterSize={1}
        />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  values: formatForCalendar(state)
});

export default connect(mapState)(Calendar);
