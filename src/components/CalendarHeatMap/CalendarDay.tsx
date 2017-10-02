import * as React from 'react';
import { HeatMapValue } from '../../types';

export interface Props {
  readonly x: number;
  readonly y: number;
  readonly value: HeatMapValue;
  readonly squareSize: number;
}

export interface State {
  readonly hovering: boolean;
}

class CalendarDay extends React.PureComponent<Props, State> {
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
    `$${value.count} earned on ${value.date.toLocaleDateString()}`;

  private handleMouseEnter = () => {
    this.setState({ hovering: true });
  };

  private handleMouseLeave = () => {
    this.setState({ hovering: false });
  };

  public render() {
    const { x, y, squareSize, value } = this.props;
    const { generateClassName } = CalendarDay;

    return (
      <rect
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={generateClassName(value)}
        width={squareSize}
        height={squareSize}
        x={x}
        y={y}
        onClick={() => console.log(value)}
      />
    );
  }
}

export default CalendarDay;
