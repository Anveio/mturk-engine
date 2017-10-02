import * as React from 'react';
import { HeatMapValue } from '../types';

export interface Props {
  x: number;
  y: number;
  value: HeatMapValue | null;
  squareSize: number;
}

class CalendarDay extends React.PureComponent<Props, never> {
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

  static generateClassName = (value: HeatMapValue | null): string => {
    if (value) {
      return 'color-filled ' + CalendarDay.calculateGrade(value.count);
    } else {
      return 'color-empty';
    }
  };

  public render() {
    const { x, y, squareSize, value } = this.props;
    return (
      <g>
        <rect
          className={CalendarDay.generateClassName(value)}
          width={squareSize}
          height={squareSize}
          x={x}
          y={y}
          onClick={() => console.log(value)}
        />
      </g>
    );
  }
}

export default CalendarDay;
