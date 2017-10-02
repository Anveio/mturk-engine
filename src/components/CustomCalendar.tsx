import * as React from 'react';
import { List } from 'immutable';
import { HeatMapValue } from '../types';
import { shiftDate } from '../utils/dates';

import CalendarDay from './CalendarDay';

const range = (n: number): number[] => Array.from(Array(n).keys());

export interface Props {
  readonly values: List<HeatMapValue>;
  readonly numDays: number;
  readonly endDate: Date;
  readonly gutterSize: number;
  readonly onClick?: () => void;
}

class CalendarHeatmap extends React.Component<Props, never> {
  startDate: Date;

  constructor(props: Props) {
    super(props);

    this.startDate = CalendarHeatmap.calculateStartDate(
      props.endDate,
      props.numDays
    );
  }

  static SQUARE_SIZE = 10;
  static MONTH_LABEL_GUTTER_SIZE = 4;
  static MILLISECONDS_IN_ONE_DAY = 86400000;
  static DAYS_IN_WEEK = 7;
  static MONTH_LABELS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  static calculateStartDate = (endDate: Date, numDays: number) => {
    return shiftDate(endDate, -numDays);
  };

  private getSquareSizeWithGutter = () =>
    CalendarHeatmap.SQUARE_SIZE + this.props.gutterSize;

  private getMonthLabelSize = () =>
    CalendarHeatmap.SQUARE_SIZE + CalendarHeatmap.MONTH_LABEL_GUTTER_SIZE;

  private getStartDateWithEmptyDays = () => {
    return shiftDate(this.startDate, -this.startDate.getDay());
  };

  private getTransformForWeek = (weekIndex: number) =>
    `translate(${weekIndex * this.getSquareSizeWithGutter()}, 0)`;

  private getTransformForAllWeeks = () =>
    `translate(0, ${this.getMonthLabelSize()})`;

  private getNumEmptyDaysAtEnd = () => {
    return CalendarHeatmap.DAYS_IN_WEEK - 1 - this.props.endDate.getDay();
  };

  private getWeekCount = () => {
    const numDaysRoundedToWeek =
      this.props.numDays +
      this.startDate.getDay() +
      this.getNumEmptyDaysAtEnd();
    return Math.ceil(numDaysRoundedToWeek / CalendarHeatmap.DAYS_IN_WEEK);
  };

  private getWeekWidth = () => {
    return CalendarHeatmap.DAYS_IN_WEEK * this.getSquareSizeWithGutter();
  };

  private getWidth = () =>
    this.getWeekCount() * this.getSquareSizeWithGutter() -
    this.props.gutterSize;

  private getHeight = () =>
    this.getWeekWidth() + (this.getMonthLabelSize() - this.props.gutterSize);

  private getViewBox = () => {
    return `0 0 ${this.getWidth()} ${this.getHeight()}`;
  };

  private getSquareCoordinates = (dayIndex: number) => [
    0,
    dayIndex * this.getSquareSizeWithGutter()
  ];

  private getMonthLabelCoordinates = (weekIndex: number) => [
    weekIndex * this.getSquareSizeWithGutter(),
    this.getMonthLabelSize() - CalendarHeatmap.MONTH_LABEL_GUTTER_SIZE
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
        squareSize={CalendarHeatmap.SQUARE_SIZE}
        x={x}
        y={y}
        value={value}
      />
    );
  };

  private renderWeek = (weekIndex: number) => (
    <g key={weekIndex} transform={this.getTransformForWeek(weekIndex)}>
      {range(CalendarHeatmap.DAYS_IN_WEEK).map((dayIndex) =>
        this.renderSquare(
          dayIndex,
          weekIndex * CalendarHeatmap.DAYS_IN_WEEK + dayIndex
        )
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
        (weekIndex + 1) * CalendarHeatmap.DAYS_IN_WEEK
      );
      const [ x, y ] = this.getMonthLabelCoordinates(weekIndex);
      return endOfWeek.getDate() >= 1 &&
      endOfWeek.getDate() <= CalendarHeatmap.DAYS_IN_WEEK ? (
        <text key={weekIndex} x={x} y={y}>
          {CalendarHeatmap.MONTH_LABELS[endOfWeek.getMonth()]}
        </text>
      ) : null;
    });
  }

  public render() {
    // this.props.values
    //   .filter((el: HeatMapValue) => el.count > 0)
    //   .forEach((el) => console.log(el));
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

export default CalendarHeatmap;
