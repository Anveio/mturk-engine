import * as React from 'react';
import { Card } from '@shopify/polaris';
import { connect } from 'react-redux';
import { RootState, BlockedHit } from 'types';
import { List } from 'immutable';
import { DATABASE_FILTER_RESULTS_PER_PAGE } from 'constants/misc';
import {
  calculateMaxPage,
  calculateHasNext,
  calculateHasPrevious
} from 'utils/pagination';
import PaginationButtons, {
  DatabaseFilterPaginationProps
} from '../Buttons/PaginationButtons';
import { sortedHitBlocklist } from 'selectors/blocklists';
import HitBlocklistHeading from './HitBlocklistHeading';
import HitBlocklistDisplay from './HitBlocklistDisplay';

interface Props {
  readonly shouldRender: boolean;
  readonly blockedHits: List<BlockedHit>;
}

interface State {
  readonly page: number;
}

class HitBlocklistView extends React.Component<Props, State> {
  public readonly state: State = { page: 0 };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      nextState.page !== this.state.page ||
      !nextProps.blockedHits.equals(this.props.blockedHits)
    );
  }

  static getDerivedStateFromProps({ blockedHits }: Props, state: State) {
    if (
      state.page >
      calculateMaxPage(blockedHits.size, DATABASE_FILTER_RESULTS_PER_PAGE)
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
          this.props.blockedHits.size,
          DATABASE_FILTER_RESULTS_PER_PAGE
        )
      )
    }));

  private onPrevious = () =>
    this.setState((prevState: State) => ({
      page: Math.max(prevState.page - 1, 0)
    }));

  public render() {
    const { shouldRender, blockedHits } = this.props;
    const { page } = this.state;

    const hasNext = calculateHasNext(
      page,
      blockedHits.size,
      DATABASE_FILTER_RESULTS_PER_PAGE
    );
    const hasPrevious = calculateHasPrevious(page);

    const paginationProps: DatabaseFilterPaginationProps = {
      hasNext,
      hasPrevious,
      onNext: this.onNext,
      onPrevious: this.onPrevious,
      shouldRender: blockedHits.size > DATABASE_FILTER_RESULTS_PER_PAGE
    };

    return (
      shouldRender && (
        <Card>
          <Card.Section>
            <HitBlocklistHeading />
          </Card.Section>
          <HitBlocklistDisplay page={page} blockedHits={blockedHits} />
          <PaginationButtons {...paginationProps} />
        </Card>
      )
    );
  }
}

const mapState = (state: RootState): Props => ({
  shouldRender: state.hitBlocklistFilterSettings.shouldRender,
  blockedHits: sortedHitBlocklist(state)
});

export default connect(mapState)(HitBlocklistView);