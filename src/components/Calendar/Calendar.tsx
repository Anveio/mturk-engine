import * as React from 'react';
import { RootState, HeatMapValue, LegacyDateFormat } from '../../types';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import { dateMoneyMap } from '../../selectors/hitDatabase';
import CalendarHeatMap from './CalendarHeatMap';
import {
  dateStringToLocaleDateString,
  generateOneYearOfData,
  generateOneYearOfDates
} from '../../utils/dates';
import CalendarButtons from '../Buttons/CalendarButtons';

interface Props {
  readonly moneyEarnedPerDay: Map<LegacyDateFormat, number>;
}

interface State {
  readonly cachedDate: Date;
  readonly cachedYearOfDates: List<string>;
}

class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const freshDate = new Date();

    this.state = Calendar.reinitializeState(freshDate);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !nextProps.moneyEarnedPerDay.equals(this.props.moneyEarnedPerDay) ||
      !nextState.cachedYearOfDates.equals(this.state.cachedYearOfDates)
    );
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const freshDate = new Date();

    const cacheIsUpToDate = Calendar.isCacheUpToDate(
      freshDate,
      state.cachedDate
    );

    return cacheIsUpToDate ? state : Calendar.reinitializeState(freshDate);
  }

  private static reinitializeState = (freshDate: Date): State => ({
    cachedDate: freshDate,
    cachedYearOfDates: generateOneYearOfDates(freshDate)
  });

  /**
   * Returns false when the user's local time passes midnight between renders.
   */
  private static isCacheUpToDate = (freshDate: Date, cachedDate: Date) =>
    freshDate.getDate() === cachedDate.getDate();

  private static displayDates = (values: List<HeatMapValue>) =>
    dateStringToLocaleDateString(values.get(0).date) + ' - Today';

  public render() {
    const freshDate = new Date();

    const cacheIsUpToDate = Calendar.isCacheUpToDate(
      freshDate,
      this.state.cachedDate
    );

    /**
     * If cacheIsOutOfDate is true, generate a fresh set of dates.
     * Otherwise, use the cached set of dates.
     */
    const values = generateOneYearOfData(
      this.props.moneyEarnedPerDay,
      cacheIsUpToDate
        ? this.state.cachedYearOfDates
        : generateOneYearOfDates(freshDate)
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
