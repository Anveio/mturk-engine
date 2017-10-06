/**
 * This code is adapted from https://github.com/patientslikeme/react-calendar-heatmap/blob/master/src/index.jsx
 */

import * as React from 'react';
import { List } from 'immutable';
import { HeatMapValue } from '../../types';
import { shiftDate } from '../../utils/dates';
import * as moment from 'moment';
import { range } from '../../utils/arrays';
import {
  GUTTER_SIZE,
  DATE_FORMAT,
  DAYS_IN_WEEK,
  MONTH_LABEL_GUTTER_SIZE,
  MONTH_LABEL_SIZE,
  MONTH_LABELS,
  SQUARE_SIZE
} from '../../constants/misc';

import CalendarDay from './CalendarDay';

export interface Props {
  readonly values: List<HeatMapValue>;
}

class CalendarHeatMap extends React.PureComponent<Props, never> {
  private readonly startDate: Date;
  private readonly endDate: Date;
  private readonly numDays: number;

  constructor(props: Props) {
    super(props);

    this.startDate = CalendarHeatMap.calculateStartDate(props.values);
    this.endDate = CalendarHeatMap.calculateEndDate(props.values);
    this.numDays = CalendarHeatMap.calculateNumDays(
      this.startDate,
      this.endDate
    );
  }

  static calculateStartDate = (values: List<HeatMapValue>) => {
    return moment(values.get(0).date, DATE_FORMAT).toDate();
  };
  static calculateEndDate = (values: List<HeatMapValue>) => {
    return moment(values.get(values.size - 1).date, DATE_FORMAT).toDate();
  };

  static calculateNumDays = (startDate: Date, endDate: Date) =>
    moment(endDate).diff(startDate, 'days');

  static getSquareSizeWithGutter = () => SQUARE_SIZE + GUTTER_SIZE;

  private getStartDateWithEmptyDays = () => {
    return shiftDate(this.startDate, -this.startDate.getDay());
  };

  private getTransformForWeek = (weekIndex: number) =>
    `translate(${weekIndex * CalendarHeatMap.getSquareSizeWithGutter()}, 0)`;

  private getTransformForAllWeeks = () => `translate(0, ${MONTH_LABEL_SIZE})`;

  private getNumEmptyDaysAtEnd = () => {
    return DAYS_IN_WEEK - 1 - this.endDate.getDay();
  };

  private getWeekCount = () => {
    const numDaysRoundedToWeek =
      this.numDays + this.startDate.getDay() + this.getNumEmptyDaysAtEnd();
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
  };

  private getWeekWidth = () => {
    return DAYS_IN_WEEK * CalendarHeatMap.getSquareSizeWithGutter();
  };

  private getWidth = () =>
    this.getWeekCount() * CalendarHeatMap.getSquareSizeWithGutter() -
    GUTTER_SIZE;

  private getHeight = () =>
    this.getWeekWidth() + (MONTH_LABEL_SIZE - GUTTER_SIZE);

  private getViewBox = () => {
    return `0 0 ${this.getWidth()} ${this.getHeight()}`;
  };

  private getSquareCoordinates = (dayIndex: number) => [
    0,
    dayIndex * CalendarHeatMap.getSquareSizeWithGutter()
  ];

  private getMonthLabelCoordinates = (weekIndex: number) => [
    weekIndex * CalendarHeatMap.getSquareSizeWithGutter(),
    MONTH_LABEL_SIZE - MONTH_LABEL_GUTTER_SIZE
  ];

  private renderSquare = (dayIndex: number, index: number) => {
    const value: HeatMapValue | undefined = this.props.values.get(index);
    if (!value) {
      return null;
    }

    const [ x, y ] = this.getSquareCoordinates(dayIndex);

    return <CalendarDay key={index} x={x} y={y} value={value} />;
  };

  private renderWeek = (weekIndex: number) => (
    <g key={weekIndex} transform={this.getTransformForWeek(weekIndex)}>
      {range(DAYS_IN_WEEK).map((dayIndex) => {
        return this.renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex);
      })}
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
      <svg
        className="react-calendar-heatmap"
        viewBox={this.getViewBox()}
        role="group"
      >
        <title>Entries for your Hit Database in the past year.</title>
        <desc>
          A graphical representation of HITs you've completed in the past year.
        </desc>
        <g>{this.renderMonthLabels()}</g>
        <g transform={this.getTransformForAllWeeks()}>
          {this.renderAllWeeks()}
        </g>
      </svg>
    );
  }
}

export default CalendarHeatMap;
