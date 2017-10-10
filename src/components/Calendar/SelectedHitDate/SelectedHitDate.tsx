import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from '@shopify/polaris';
import { RootState } from '../../../types';
import { RESULTS_PER_PAGE } from '../../../constants/misc';
import { hitsOnSelectedDateIds } from '../../../selectors/hitDatabaseDay';
import CompletedHitList from './CompletedHitList';
import DateDisplay from './DateDisplay';
import InfoHeader from './InfoHeader';

export interface Props {
  readonly selectedDate: string | null;
  readonly numResults: number;
}

export interface State {
  readonly page: number;
}

class SelectedHitDate extends React.PureComponent<Props, State> {
  private maxPage: number;
  constructor(props: Props) {
    super(props);
    this.state = { page: 0 };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.maxPage = this.calculateMaxPage(
      nextProps.numResults,
      RESULTS_PER_PAGE
    );

    if (nextProps.selectedDate !== this.props.selectedDate) {
      this.setState((): Partial<State> => ({
        page: 0
      }));
    }
  }

  private calculateMaxPage = (numResults: number, resultsPerPage: number) =>
    Math.ceil(numResults / resultsPerPage) - 1;
  private calculateHasNext = (page: number, maxPage: number) => page < maxPage;
  private calculateHasPrevious = (page: number) => page > 0;

  private onNext = () =>
    this.setState((prevState: State): Partial<State> => ({
      page: Math.min(prevState.page + 1, this.maxPage)
    }));

  private onPrevious = () =>
    this.setState((prevState: State): Partial<State> => ({
      page: Math.max(prevState.page - 1, 0)
    }));

  public render() {
    // console.log(this.props.numResults, this.maxPage);
    const hasNext = this.calculateHasNext(this.state.page, this.maxPage);
    const hasPrevious = this.calculateHasPrevious(this.state.page);

    const infoHeaderProps = {
      hasNext,
      hasPrevious,
      onNext: this.onNext,
      onPrevious: this.onPrevious
    };

    return this.props.selectedDate ? (
      <Card>
        <DateDisplay />
        <InfoHeader {...infoHeaderProps} />
        <CompletedHitList page={this.state.page} />
      </Card>
    ) : (
      <Card>
        <DateDisplay />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedDate: state.selectedHitDbDate,
  numResults: hitsOnSelectedDateIds(state).size
});

export default connect(mapState)(SelectedHitDate);
