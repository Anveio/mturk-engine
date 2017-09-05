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
  state = { timeUntilNextSearch: null };
  private tickRate: number = 100;
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
    this.timerId = window.setInterval(() => this.tick(), this.tickRate);
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
      <div />
    );
  }
}

export default connect(mapState)(TimeNextSearch);
