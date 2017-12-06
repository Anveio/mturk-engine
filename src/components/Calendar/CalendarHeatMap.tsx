/**
 * This code is adapted from https://github.com/patientslikeme/react-calendar-heatmap/blob/master/src/index.jsx
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { RootState, HeatMapValue } from '../../types';
import { shiftDate } from '../../utils/dates';
import * as moment from 'moment';
import { range } from '../../utils/arrays';
import { oneYearOfData } from '../../selectors/hitDatabase';
import {
  HEATMAP_CSS_PREFIX,
  GUTTER_SIZE,
  DATE_FORMAT,
  WEEKDAY_LABELS,
  WEEKDAY_LABEL_SIZE,
  DAYS_IN_WEEK,
  SQUARE_SIZE_WITH_GUTTER,
  MONTH_LABEL_GUTTER_SIZE,
  MONTH_LABEL_SIZE,
  MONTH_LABELS,
  SQUARE_SIZE,
  WEEK_WIDTH,
  SQUARE_BORDER_RADIUS
} from '../../constants/misc';

import CalendarDay from './CalendarDay';

export interface Props {
  readonly values: List<HeatMapValue>;
}

class CalendarHeatMap extends React.Component<Props, never> {
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

  shouldComponentUpdate(nextProps: Props) {
    return !nextProps.values.equals(this.props.values);
  }

  private static calculateStartDate = (values: List<HeatMapValue>) =>
    moment(values.get(0).date, DATE_FORMAT).toDate();

  private static calculateEndDate = (values: List<HeatMapValue>) =>
    moment(values.get(values.size - 1).date, DATE_FORMAT).toDate();

  private static calculateNumDays = (startDate: Date, endDate: Date) =>
    moment(endDate).diff(startDate, 'days');

  private static getTransformForWeekdayLabels = () =>
    `translate(${SQUARE_SIZE}, ${MONTH_LABEL_SIZE})`;

  private static getTransformForMonthLabels = () =>
    `translate(${WEEKDAY_LABEL_SIZE}, 0)`;

  private static getWeekdayLabelCoordinates = (dayIndex: number) => [
    0,
    (dayIndex + 1) * SQUARE_SIZE + dayIndex * GUTTER_SIZE - SQUARE_BORDER_RADIUS
  ];

  private static getTransformForWeek = (weekIndex: number) =>
    `translate(${weekIndex * SQUARE_SIZE_WITH_GUTTER}, 0)`;

  private static getMonthLabelCoordinates = (weekIndex: number) => [
    weekIndex * SQUARE_SIZE_WITH_GUTTER,
    MONTH_LABEL_SIZE - MONTH_LABEL_GUTTER_SIZE
  ];

  private static getTransformForAllWeeks = () =>
    `translate(${WEEKDAY_LABEL_SIZE}, ${MONTH_LABEL_SIZE})`;

  private getStartDateWithEmptyDays = () => {
    return shiftDate(this.startDate, -this.startDate.getDay());
  };

  private getNumEmptyDaysAtEnd = () => DAYS_IN_WEEK - 1 - this.endDate.getDay();

  private getWeekCount = () => {
    const numDaysRoundedToWeek =
      this.numDays + this.startDate.getDay() + this.getNumEmptyDaysAtEnd();
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
  };

  private getWidth = () =>
    this.getWeekCount() * SQUARE_SIZE_WITH_GUTTER -
    GUTTER_SIZE +
    WEEKDAY_LABEL_SIZE;

  private getHeight = () => WEEK_WIDTH + (MONTH_LABEL_SIZE - GUTTER_SIZE);

  private getViewBox = () =>
    `0 0 ${this.getWidth() + SQUARE_BORDER_RADIUS} ${this.getHeight() +
      SQUARE_BORDER_RADIUS}`;

  private getSquareCoordinates = (dayIndex: number) => [
    0,
    dayIndex * SQUARE_SIZE_WITH_GUTTER
  ];

  private renderMonthLabels = () => {
    const weekRange = range(this.getWeekCount() - 1); // don't render for last week, because label will be cut off
    return weekRange.map(weekIndex => {
      const endOfWeek = shiftDate(
        this.getStartDateWithEmptyDays(),
        (weekIndex + 1) * DAYS_IN_WEEK
      );
      const [x, y] = CalendarHeatMap.getMonthLabelCoordinates(weekIndex);
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <text key={weekIndex} x={x} y={y}>
          {MONTH_LABELS[endOfWeek.getMonth()]}
        </text>
      ) : null;
    });
  };

  private renderWeekdayLabels = () =>
    WEEKDAY_LABELS.map((weekdayLabel, dayIndex) => {
      const [x, y] = CalendarHeatMap.getWeekdayLabelCoordinates(dayIndex);
      return !!weekdayLabel ? ( // eslint-disable-line no-bitwise
        <text
          key={dayIndex}
          x={x}
          y={y}
          className={HEATMAP_CSS_PREFIX + 'small-text'}
        >
          {weekdayLabel}
        </text>
      ) : null;
    });

  private renderAllWeeks = () =>
    range(this.getWeekCount()).map(weekIndex => this.renderWeek(weekIndex));

  private renderSquare = (dayIndex: number, index: number) => {
    const value: HeatMapValue | undefined = this.props.values.get(index);
    if (!value) {
      return null;
    }

    const [x, y] = this.getSquareCoordinates(dayIndex);

    return <CalendarDay key={index} x={x} y={y} value={value} />;
  };

  private renderWeek = (weekIndex: number) => (
    <g
      key={weekIndex}
      transform={CalendarHeatMap.getTransformForWeek(weekIndex)}
    >
      {range(DAYS_IN_WEEK).map(dayIndex =>
        this.renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex)
      )}
    </g>
  );

  public render() {
    const {
      getTransformForAllWeeks,
      getTransformForMonthLabels,
      getTransformForWeekdayLabels
    } = CalendarHeatMap;
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
        <g
          transform={getTransformForMonthLabels()}
          className={`${HEATMAP_CSS_PREFIX}month-labels`}
        >
          {this.renderMonthLabels()}
        </g>
        <g
          transform={getTransformForAllWeeks()}
          className={`${HEATMAP_CSS_PREFIX}all-weeks`}
        >
          {this.renderAllWeeks()}
        </g>
        <g
          transform={getTransformForWeekdayLabels()}
          className={`${HEATMAP_CSS_PREFIX}weekday-labels`}
        >
          {this.renderWeekdayLabels()}
        </g>
      </svg>
    );
  }
}

const mapState = (state: RootState): Props => ({
  values: oneYearOfData(state)
});

export default connect(mapState)(CalendarHeatMap);
