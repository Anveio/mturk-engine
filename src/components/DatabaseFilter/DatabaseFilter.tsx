import * as React from 'react';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, HitId } from 'types';
import {
  filteredResultsIds,
  databaseFilterResultsMoneyTotal
} from 'selectors/databaseFilterSettings';
import { Iterable } from 'immutable';
import PaginationButtons, {
  DatabaseFilterPaginationProps
} from '../Buttons/PaginationButtons';
import { DATABASE_FILTER_RESULTS_PER_PAGE } from 'constants/misc';
import ResultsList from './ResultsList';
import { formatAsUsd, pluralize } from 'utils/formatting';
import {
  calculateMaxPage,
  calculateHasNext,
  calculateHasPrevious
} from 'utils/pagination';

interface Props {
  readonly hitIds: Iterable<HitId, HitId>;
  readonly resultsMoneyTotal: number;
}

interface State {
  readonly page: number;
}

class DatabaseFilter extends React.Component<Props, State> {
  public readonly state: State = { page: 0 };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      nextState.page !== this.state.page ||
      !nextProps.hitIds.equals(this.props.hitIds)
    );
  }

  static getDerivedStateFromProps({ hitIds }: Props, state: State) {
    if (
      state.page >
      calculateMaxPage(hitIds.size, DATABASE_FILTER_RESULTS_PER_PAGE)
    ) {
      return {
        page: 0
      };
    }

    return null;
  }

  private onNext = () =>
    this.setState((prevState: State) => ({
      page: Math.min(
        prevState.page + 1,
        calculateMaxPage(
          this.props.hitIds.size,
          DATABASE_FILTER_RESULTS_PER_PAGE
        )
      )
    }));

  private onPrevious = () =>
    this.setState((prevState: State) => ({
      page: Math.max(prevState.page - 1, 0)
    }));

  private generateCardTitle = () =>
    this.props.hitIds.size > 0
      ? `Found ${this.props.hitIds.size} ${pluralize('result', 'results')(
          this.props.hitIds.size
        )} in your database totaling ${formatAsUsd(
          this.props.resultsMoneyTotal
        )}.`
      : 'Search your HIT database.';

  public render() {
    const { hitIds } = this.props;
    const { page } = this.state;

    const hasNext = calculateHasNext(
      page,
      hitIds.size,
      DATABASE_FILTER_RESULTS_PER_PAGE
    );
    const hasPrevious = calculateHasPrevious(page);

    const paginationProps: DatabaseFilterPaginationProps = {
      hasNext,
      hasPrevious,
      onNext: this.onNext,
      onPrevious: this.onPrevious,
      shouldRender: hitIds.size > DATABASE_FILTER_RESULTS_PER_PAGE
    };

    return (
      <Card title={this.generateCardTitle()}>
        <ResultsList page={page} hitIds={hitIds} />
        <PaginationButtons {...paginationProps} />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: filteredResultsIds(state),
  resultsMoneyTotal: databaseFilterResultsMoneyTotal(state)
});

export default connect(mapState)(DatabaseFilter);
