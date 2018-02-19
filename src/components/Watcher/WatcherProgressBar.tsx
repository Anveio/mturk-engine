import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
// import { Caption } from '@shopify/polaris';
import { ProgressBar } from '@blueprintjs/core';

interface OwnProps {
  readonly id: string;
}

interface Props {
  readonly timeOfNextSearch: Date | null;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

const mapState = (state: RootState, ownProps: OwnProps): Props => {
  const watcherTimer = state.watcherTimes.get(ownProps.id);
  return {
    timeOfNextSearch: (watcherTimer && watcherTimer.date) || null
  };
};

class WatcherTimer extends React.PureComponent<OwnProps & Props, State> {
  private static readonly tickRate: number = 100;
  private timerId: number;
  private dateNumNextSearch: number;
  private delay: number;

  public readonly state: State = { timeUntilNextSearch: null };

  componentDidMount() {
    const { timeOfNextSearch } = this.props;
    if (timeOfNextSearch) {
      this.dateNumNextSearch = timeOfNextSearch.valueOf();
      this.delay = WatcherTimer.calculateTimeUntilNextSearch(
        this.dateNumNextSearch
      );
      this.startTimer();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    clearInterval(this.timerId);
    if (nextProps.timeOfNextSearch) {
      this.dateNumNextSearch = nextProps.timeOfNextSearch.valueOf();
      this.delay = WatcherTimer.calculateTimeUntilNextSearch(
        this.dateNumNextSearch
      );
      this.startTimer();
    } else {
      this.setState({ timeUntilNextSearch: null });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  private static calculateTimeUntilNextSearch = (
    nextSearch: number
  ): number => {
    return Math.max(nextSearch - Date.now(), 0);
  };

  private static calculateProgress = (
    delay: number,
    timeLeft: number
  ): number => {
    return 1 - timeLeft / delay;
  };

  private startTimer = () => {
    this.timerId = window.setInterval(() => this.tick(), WatcherTimer.tickRate);
  };

  private tick = () => {
    if (this.props.timeOfNextSearch) {
      this.setState({
        timeUntilNextSearch: WatcherTimer.calculateTimeUntilNextSearch(
          this.dateNumNextSearch
        )
      });
    }
  };

  public render() {
    const { timeUntilNextSearch } = this.state;

    const spinnerProgress =
      timeUntilNextSearch === null
        ? 0
        : WatcherTimer.calculateProgress(this.delay, timeUntilNextSearch);

    return <ProgressBar value={spinnerProgress} />;
  }
}

export default connect(mapState)(WatcherTimer);
