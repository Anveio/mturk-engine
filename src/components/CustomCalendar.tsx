import * as React from 'react';
import { HeatMapValue } from '../types';
// import * as v4 from 'uuid/v4';

export function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const range = (n: number): number[] => Array.from(Array(n).keys());

export function convertToDate(obj: Date | string) {
  return obj instanceof Date ? obj : new Date(obj);
}

export interface Props {
  readonly values: HeatMapValue[];
  readonly numDays: number;
  readonly endDate: Date;
  readonly gutterSize: number;
  readonly onClick?: Function;
}
export interface State {
  readonly [key: string]: any;
}

class CalendarHeatmap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      valueCache: this.getValueCache(props.values)
    };
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

  static classForValue = (value?: HeatMapValue) =>
    value && value.count > 0 ? 'color-filled' : 'color-empty';

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      valueCache: this.getValueCache(nextProps.values)
    });
  }

  private getSquareSizeWithGutter = () =>
    CalendarHeatmap.SQUARE_SIZE + this.props.gutterSize;

  private getMonthLabelSize = () =>
    CalendarHeatmap.SQUARE_SIZE + CalendarHeatmap.MONTH_LABEL_GUTTER_SIZE;

  private getStartDate = () => {
    return shiftDate(this.props.endDate, -this.props.numDays + 1); // +1 because endDate is inclusive
  };

  private getStartDateWithEmptyDays = () => {
    return shiftDate(this.getStartDate(), -this.getNumEmptyDaysAtStart());
  };

  private getTransformForWeek = (weekIndex: number) =>
    `translate(${weekIndex * this.getSquareSizeWithGutter()}, 0)`;

  private getTransformForAllWeeks = () =>
    `translate(0, ${this.getMonthLabelSize()})`;

  private getNumEmptyDaysAtStart = () => {
    return this.getStartDate().getDay();
  };

  private getNumEmptyDaysAtEnd = () => {
    return CalendarHeatmap.DAYS_IN_WEEK - 1 - this.props.endDate.getDay();
  };

  private getWeekCount = () => {
    const numDaysRoundedToWeek =
      this.props.numDays +
      this.getNumEmptyDaysAtStart() +
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

  private getValueCache = (values: HeatMapValue[]) => {
    return values.reduce((acc, value) => {
      const date = convertToDate(value.date);
      const index: number = Math.floor(
        (date.valueOf() - this.getStartDateWithEmptyDays().valueOf()) /
          CalendarHeatmap.MILLISECONDS_IN_ONE_DAY
      );
      return {
        ...acc,
        [index]: { value, className: CalendarHeatmap.classForValue(value) }
      };
    }, {});
  };

  private getClassNameForIndex = (index: number): string => {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index].className;
    }
    return 'color-empty';
  };

  private getValueForIndex = (index: number): null | HeatMapValue => {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index].value;
    }
    return null;
  };

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

  private handleClick = (value: HeatMapValue) => {
    if (this.props.onClick) {
      this.props.onClick(value);
    }
  };

  private renderSquare = (dayIndex: number, index: number) => {
    const indexOutOfRange =
      index < this.getNumEmptyDaysAtStart() ||
      index >= this.getNumEmptyDaysAtStart() + this.props.numDays;
    if (indexOutOfRange) {
      return null;
    }
    const [ x, y ] = this.getSquareCoordinates(dayIndex);
    const value = this.getValueForIndex(index);

    return (
        <rect
          key={index}
          className={this.getClassNameForIndex(index)}
          width={CalendarHeatmap.SQUARE_SIZE}
          height={CalendarHeatmap.SQUARE_SIZE}
          x={x}
          y={y}
          onClick={this.handleClick.bind(this, value)}
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
