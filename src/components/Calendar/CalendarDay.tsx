import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { HeatMapValue } from '../../types';
import { SQUARE_SIZE } from '../../constants/misc';
import {
  SelectDatabaseDate,
  selectDatabaseDate
} from '../../actions/selectDatabaseDate';

export interface OwnProps {
  readonly x: number;
  readonly y: number;
  readonly value: HeatMapValue;
}

export interface Handlers {
  readonly onSelect: (dateString: string) => void;
}

export interface State {
  readonly hovering: boolean;
}

class CalendarDay extends React.PureComponent<OwnProps & Handlers, State> {
  readonly state: State = { hovering: false };

  static calculateTooltipVisibility = (hovering: boolean) =>
    hovering ? 'visible' : 'hidden';

  static calculateGrade = (count: number): string => {
    if (count >= 20) {
      return 'color-github-4';
    } else if (count >= 10) {
      return 'color-github-3';
    } else if (count >= 5) {
      return 'color-github-2';
    } else {
      return 'color-github-1';
    }
  };

  static generateClassName = (value: HeatMapValue): string => {
    if (value.count > 0) {
      return 'color-filled ' + CalendarDay.calculateGrade(value.count);
    } else {
      return 'color-empty';
    }
  };

  static titleForValue = (value: HeatMapValue) =>
    `$${value.count} earned on ${value.date}`;

  private handleMouseEnter = () => {
    this.setState({ hovering: true });
  };

  private handleMouseLeave = () => {
    this.setState({ hovering: false });
  };

  private handleSelect = () => {
    this.props.onSelect(this.props.value.date);
  };

  public render() {
    const { x, y, value } = this.props;
    const { generateClassName } = CalendarDay;

    return (
      <rect
        onClick={this.handleSelect}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={generateClassName(value)}
        height={SQUARE_SIZE}
        width={SQUARE_SIZE}
        x={x}
        y={y}
      />
    );
  }
}

const mapDispatch = (dispatch: Dispatch<SelectDatabaseDate>): Handlers => ({
  onSelect: (date: string) => dispatch(selectDatabaseDate(date))
});

export default connect(null, mapDispatch)(CalendarDay);
