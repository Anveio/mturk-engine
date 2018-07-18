import * as React from 'react';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, HitId } from 'types';
import { Iterable } from 'immutable';
import { DATABASE_FILTER_RESULTS_PER_PAGE } from 'constants/misc';
import {
  calculateMaxPage,
  calculateHasNext,
  calculateHasPrevious
} from 'utils/pagination';
import PaginationButtons, {
  DatabaseFilterPaginationProps
} from '../Buttons/PaginationButtons';
import { filteredHitBlocklistIds } from 'selectors/blocklists';
import HitBlockListFilter from './HitBlockListFilter';

interface Props {
  readonly hitIds: Iterable<HitId, HitId>;
}

interface State {
  readonly page: number;
}

class HitBlockList extends React.Component<Props, State> {
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
      <Card title={`Search blocked HITs (${hitIds.size} entries found).`}>
        <HitBlockListFilter page={page} hitIds={hitIds} />
        <PaginationButtons {...paginationProps} />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: filteredHitBlocklistIds(state)
});

export default connect(mapState)(HitBlockList);
