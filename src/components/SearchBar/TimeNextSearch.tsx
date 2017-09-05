import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Caption } from '@shopify/polaris';

interface Props {
  readonly timeNextSearch: Date | null;
  readonly searchingActive: boolean;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

const mapState = (state: RootState): Props => ({
  timeNextSearch: state.timeNextSearch,
  searchingActive: state.searchingActive
});

class TimeNextSearch extends React.PureComponent<Props, State> {
  public readonly state = { timeUntilNextSearch: null };
  static readonly tickRate: number = 16.67;
  private timerId: number;
  private dateNumNextSearch: number;

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.timeNextSearch) {
      clearInterval(this.timerId);
      this.dateNumNextSearch = nextProps.timeNextSearch.valueOf();
      this.startTimer();
    }
  }

  private startTimer = () => {
    this.timerId = window.setInterval(
      () => this.tick(),
      TimeNextSearch.tickRate
    );
  };

  static calculateTimeUntilNextSearch = (nextSearch: number): number => {
    return Math.max(nextSearch - Date.now(), 0);
  };

  private tick = () => {
    if (this.props.timeNextSearch) {
      this.setState({
        timeUntilNextSearch: TimeNextSearch.calculateTimeUntilNextSearch(
          this.dateNumNextSearch
        )
      });
    }
  };

  public render() {
    const { timeNextSearch, searchingActive } = this.props;
    return timeNextSearch && searchingActive ? (
      <Caption>Next search in: {this.state.timeUntilNextSearch}</Caption>
    ) : (
      <svg viewBox="0 0 100 100">
        <path
          className="pt-spinner-track"
          d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
        />
        <path
          className="pt-spinner-head"
          d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"
        />
      </svg>
    );
  }
}

export default connect(mapState)(TimeNextSearch);
