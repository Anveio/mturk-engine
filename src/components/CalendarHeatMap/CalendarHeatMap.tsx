import * as React from 'react';
import { List } from 'immutable';
import { HeatMapValue } from '../../types';
import { shiftDate } from '../../utils/dates';
import {
  DAYS_IN_WEEK,
  MONTH_LABEL_GUTTER_SIZE,
  MONTH_LABEL_SIZE,
  MONTH_LABELS,
  SQUARE_SIZE
} from '../../constants/misc';

import CalendarDay from './CalendarDay';

const range = (n: number): number[] => Array.from(Array(n).keys());

export interface Props {
  readonly values: List<HeatMapValue>;
  readonly numDays: number;
  readonly endDate: Date;
  readonly gutterSize: number;
  readonly onClick?: () => void;
}

class CalendarHeatMap extends React.Component<Props, never> {
  readonly startDate: Date;

  constructor(props: Props) {
    super(props);

    this.startDate = CalendarHeatMap.calculateStartDate(
      props.endDate,
      props.numDays
    );
  }

  static calculateStartDate = (endDate: Date, numDays: number) => {
    return shiftDate(endDate, -numDays);
  };

  private getSquareSizeWithGutter = () => SQUARE_SIZE + this.props.gutterSize;

  private getStartDateWithEmptyDays = () => {
    return shiftDate(this.startDate, -this.startDate.getDay());
  };

  private getTransformForWeek = (weekIndex: number) =>
    `translate(${weekIndex * this.getSquareSizeWithGutter()}, 0)`;

  private getTransformForAllWeeks = () => `translate(0, ${MONTH_LABEL_SIZE})`;

  private getNumEmptyDaysAtEnd = () => {
    return DAYS_IN_WEEK - 1 - this.props.endDate.getDay();
  };

  private getWeekCount = () => {
    const numDaysRoundedToWeek =
      this.props.numDays +
      this.startDate.getDay() +
      this.getNumEmptyDaysAtEnd();
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
  };

  private getWeekWidth = () => {
    return DAYS_IN_WEEK * this.getSquareSizeWithGutter();
  };

  private getWidth = () =>
    this.getWeekCount() * this.getSquareSizeWithGutter() -
    this.props.gutterSize;

  private getHeight = () =>
    this.getWeekWidth() + (MONTH_LABEL_SIZE - this.props.gutterSize);

  private getViewBox = () => {
    return `0 0 ${this.getWidth()} ${this.getHeight()}`;
  };

  private getSquareCoordinates = (dayIndex: number) => [
    0,
    dayIndex * this.getSquareSizeWithGutter()
  ];

  private getMonthLabelCoordinates = (weekIndex: number) => [
    weekIndex * this.getSquareSizeWithGutter(),
    MONTH_LABEL_SIZE - MONTH_LABEL_GUTTER_SIZE
  ];

  private renderSquare = (dayIndex: number, index: number) => {
    const indexOutOfRange =
      index < this.startDate.getDay() ||
      index >= this.startDate.getDay() + this.props.numDays;
    if (indexOutOfRange) {
      return null;
    }

    const [ x, y ] = this.getSquareCoordinates(dayIndex);
    const value = this.props.values.get(index);

    return (
      <CalendarDay
        key={index}
        squareSize={SQUARE_SIZE}
        x={x}
        y={y}
        value={value}
      />
    );
  };

  private renderWeek = (weekIndex: number) => (
    <g key={weekIndex} transform={this.getTransformForWeek(weekIndex)}>
      {range(DAYS_IN_WEEK).map((dayIndex) =>
        this.renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex)
      )}
    </g>
  );

  private renderAllWeeks() {
    return range(this.getWeekCount()).map((weekIndex) =>
      this.renderWeek(weekIndex)
    );
  }

  private renderMonthLabels() {
    const weekRange = range(this.getWeekCount() - 1); // don't render for last week, because label will be cut off
    return weekRange.map((weekIndex) => {
      const endOfWeek = shiftDate(
        this.getStartDateWithEmptyDays(),
        (weekIndex + 1) * DAYS_IN_WEEK
      );
      const [ x, y ] = this.getMonthLabelCoordinates(weekIndex);
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <text key={weekIndex} x={x} y={y}>
          {MONTH_LABELS[endOfWeek.getMonth()]}
        </text>
      ) : null;
    });
  }

  public render() {
    return (
      <svg className="react-calendar-heatmap" viewBox={this.getViewBox()}>
        <g>{this.renderMonthLabels()}</g>
        <g transform={this.getTransformForAllWeeks()}>
          {this.renderAllWeeks()}
        </g>
      </svg>
    );
  }
}

export default CalendarHeatMap;
