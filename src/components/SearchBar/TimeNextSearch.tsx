import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Caption } from '@shopify/polaris';

interface Props {
  readonly timeNextSearch: Date | null;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

const mapState = (state: RootState): Props => ({
  timeNextSearch: state.timeNextSearch
});

class TimeNextSearch extends React.PureComponent<Props, State> {
  state = { timeUntilNextSearch: null };
  private tickRate: number = 1000;
  private timerId: number;

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.timeNextSearch) {
      clearInterval(this.timerId);
      this.startTimer();
    }
  }

  private startTimer = () => {
    this.timerId = window.setInterval(() => this.tick(), this.tickRate);
  };

  private calculateTimeUntilNextSearch = (nextSearch: Date): number => {
    return Math.max(nextSearch.valueOf() - Date.now(), 0);
  };

  private tick = () => {
    if (this.props.timeNextSearch) {
      this.setState({
        timeUntilNextSearch: this.calculateTimeUntilNextSearch(
          this.props.timeNextSearch
        )
      });
    }
  };

  public render() {
    const { timeNextSearch } = this.props;
    return timeNextSearch ? (
      <Caption>Next search in: {this.state.timeUntilNextSearch}</Caption>
    ) : (
      <div />
    );
  }
}

export default connect(mapState)(TimeNextSearch);
