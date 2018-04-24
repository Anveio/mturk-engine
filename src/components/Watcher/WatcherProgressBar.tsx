import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { ProgressBar } from '@blueprintjs/core';

interface OwnProps {
  readonly id: string;
}

interface Props {
  readonly timeOfNextSearch: Date | null;
}

interface State {
  readonly spinnerProgress: number;
  readonly startTime: number;
}

const mapState = (state: RootState, ownProps: OwnProps): Props => {
  const watcherTimer = state.watcherTimers.get(ownProps.id);
  return {
    timeOfNextSearch: (watcherTimer && watcherTimer.date) || null
  };
};

class WatcherProgressBar extends React.PureComponent<OwnProps & Props, State> {
  private static readonly tickRate: number = 100;
  private timerId: number;

  public readonly state: State = WatcherProgressBar.defaultState;

  private static defaultState: State = {
    startTime: Date.now(),
    spinnerProgress: 0
  };

  static getDerivedStateFromProps(nextProps: OwnProps & Props): Partial<State> {
    if (!nextProps.timeOfNextSearch) {
      return WatcherProgressBar.defaultState;
    }

    return {
      startTime: Date.now(),
      spinnerProgress: 0
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  private static calculateTimeBetweenStartAndEnd = (
    startTime: number,
    dateNumNextSearch: number
  ): number => {
    return Math.max(dateNumNextSearch - startTime, 0);
  };

  private static calculateProgress = (
    timeLeft: number,
    total: number
  ): number => {
    if (total === 0) {
      return 1;
    }

    return 1 - timeLeft / total;
  };

  private startTimer = () => {
    clearInterval(this.timerId);
    this.timerId = window.setInterval(
      () => this.tick(),
      WatcherProgressBar.tickRate
    );
  };

  private tick = () => {
    const { timeOfNextSearch } = this.props;

    if (!timeOfNextSearch) {
      return;
    }

    const dateNumNextSearch = timeOfNextSearch.valueOf();

    this.setState({
      spinnerProgress: WatcherProgressBar.calculateProgress(
        dateNumNextSearch - Date.now(),
        WatcherProgressBar.calculateTimeBetweenStartAndEnd(
          this.state.startTime,
          dateNumNextSearch
        )
      )
    });
  };

  public render() {
    return <ProgressBar value={this.state.spinnerProgress} />;
  }
}

export default connect(mapState)(WatcherProgressBar);
