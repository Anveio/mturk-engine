import * as React from 'react';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, HitId } from 'types';
import {
  filteredResultsIds,
  databaseFilterResultsMoneyTotal
} from 'selectors/databaseFilterSettings';
import { Iterable } from 'immutable';
import DatabaseFilterPagination, {
  DatabaseFilterPaginationProps
} from './DatabaseFilterPagination';
import { DATABASE_FILTER_RESULTS_PER_PAGE } from 'constants/misc';
import ResultsList from './ResultsList';
import { formatAsUsd, pluralize } from 'utils/formatting';

interface Props {
  readonly hitIds: Iterable<HitId, HitId>;
  readonly resultsMoneyTotal: number;
}

interface State {
  readonly page: number;
  readonly maxPage: number;
}

class DatabaseFilter extends React.Component<Props, State> {
  public readonly state: State = { page: 0, maxPage: 0 };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      nextState.page !== this.state.page ||
      !nextProps.hitIds.equals(this.props.hitIds)
    );
  }

  static getDerivedStateFromProps(nextProps: Props): State {
    return {
      page: 0,
      maxPage: DatabaseFilter.calculateMaxPage(
        nextProps.hitIds.size,
        DATABASE_FILTER_RESULTS_PER_PAGE
      )
    };
  }

  private static calculateMaxPage = (
    numResults: number,
    resultsPerPage: number
  ) => Math.ceil(numResults / resultsPerPage) - 1;

  private calculateHasNext = (page: number, maxPage: number) => page < maxPage;
  private calculateHasPrevious = (page: number) => page > 0;

  private onNext = () =>
    this.setState((prevState: State) => ({
      page: Math.min(prevState.page + 1, this.state.maxPage)
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
    const hasNext = this.calculateHasNext(this.state.page, this.state.maxPage);
    const hasPrevious = this.calculateHasPrevious(this.state.page);

    const paginationProps: DatabaseFilterPaginationProps = {
      hasNext,
      hasPrevious,
      onNext: this.onNext,
      onPrevious: this.onPrevious,
      shouldRender: this.props.hitIds.size > DATABASE_FILTER_RESULTS_PER_PAGE
    };

    return (
      <Card title={this.generateCardTitle()}>
        <ResultsList page={this.state.page} hitIds={this.props.hitIds} />
        <DatabaseFilterPagination {...paginationProps} />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: filteredResultsIds(state),
  resultsMoneyTotal: databaseFilterResultsMoneyTotal(state)
});

export default connect(mapState)(DatabaseFilter);
