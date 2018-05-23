import * as React from 'react';
import { RootState, HeatMapValue, LegacyDateFormat } from '../../types';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import { dateMoneyMap } from '../../selectors/hitDatabase';
import CalendarHeatMap from './CalendarHeatMap';
import {
  dateStringToLocaleDateString,
  generateOneYearOfDates
} from '../../utils/dates';
import CalendarButtons from '../Buttons/CalendarButtons';

interface Props {
  readonly moneyEarnedPerDay: Map<LegacyDateFormat, number>;
}

class Calendar extends React.Component<Props, never> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.moneyEarnedPerDay.equals(this.props.moneyEarnedPerDay);
  }

  private static displayDates = (values: List<HeatMapValue>) => {
    return dateStringToLocaleDateString(values.get(0).date) + ' - Today';
  };

  private static generateOneYearOfData = (
    map: Map<LegacyDateFormat, number>,
    now: Date
  ) => {
    const oneYearOfDates = generateOneYearOfDates(now);
    return oneYearOfDates.reduce(
      (acc: List<HeatMapValue>, date: LegacyDateFormat) => {
        const count: number | undefined = map.get(date);
        const data = count
          ? { date, count: Math.round(count * 100) / 100 }
          : { date, count: 0 };
        return acc.push(data);
      },
      List()
    );
  };

  public render() {
    const values = Calendar.generateOneYearOfData(
      this.props.moneyEarnedPerDay,
      new Date()
    );
    return (
      <Card title={`HIT Database (${Calendar.displayDates(values)})`}>
        <Card.Section>
          <CalendarHeatMap values={values} />
          <CalendarButtons />
        </Card.Section>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  moneyEarnedPerDay: dateMoneyMap(state)
});

export default connect(mapState)(Calendar);
