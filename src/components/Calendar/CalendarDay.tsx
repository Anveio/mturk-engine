import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, HeatMapValue, LegacyDateFormat } from '../../types';
import { SQUARE_SIZE, SQUARE_BORDER_RADIUS } from '../../constants/misc';
import {
  SelectDatabaseDate,
  selectDatabaseDate,
  clearDatabaseDateSelection
} from '../../actions/selectDatabaseDate';

export interface OwnProps {
  readonly x: number;
  readonly y: number;
  readonly value: HeatMapValue;
}

export interface Props {
  readonly selected: boolean;
}

export interface Handlers {
  readonly onSelect: (dateString: LegacyDateFormat) => void;
  readonly clearSelect: () => void;
}

class CalendarDay extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private static calculateGrade = (count: number): string => {
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

  private static generateClassName = (value: HeatMapValue): string => {
    if (value.count > 0) {
      return 'color-filled ' + CalendarDay.calculateGrade(value.count);
    } else {
      return 'color-empty';
    }
  };

  private static generateStyle = (selected: boolean) =>
    selected
      ? {
          stroke: '#111111',
          strokeWidth: `${SQUARE_BORDER_RADIUS}px`
        }
      : {};

  private handleSelect = () => {
    if (this.props.selected) {
      this.props.clearSelect();
    } else {
      this.props.onSelect(this.props.value.date);
    }
  };

  public render() {
    const { x, y, value, selected } = this.props;
    const { generateClassName, generateStyle } = CalendarDay;

    return (
      <rect
        onClick={this.handleSelect}
        className={generateClassName(value)}
        style={generateStyle(selected)}
        height={SQUARE_SIZE}
        width={SQUARE_SIZE}
        x={x}
        y={y}
        role="presentation"
        focusable="false"
      />
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  selected: ownProps.value.date === state.selectedHitDbDate
});

const mapDispatch = (dispatch: Dispatch<SelectDatabaseDate>): Handlers => ({
  onSelect: (date: string) => dispatch(selectDatabaseDate(date)),
  clearSelect: () => dispatch(clearDatabaseDateSelection())
});

export default connect(mapState, mapDispatch)(CalendarDay);
