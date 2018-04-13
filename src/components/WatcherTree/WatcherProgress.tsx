import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import ProgressSpinner from './ProgressSpinner';

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
  const watcherTimer = state.watcherTimes.get(ownProps.id);
  return {
    timeOfNextSearch: (watcherTimer && watcherTimer.date) || null
  };
};

class WatcherProgress extends React.PureComponent<OwnProps & Props, State> {
  private static readonly tickRate: number = 100;
  private timerId: number;

  public readonly state: State = {
    startTime: Date.now(),
    spinnerProgress: 0
  };

  static getDerivedStateFromProps(
    nextProps: OwnProps & Props
  ): Partial<State> | null {
    if (!nextProps.timeOfNextSearch) {
      return null;
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
      WatcherProgress.tickRate
    );
  };

  private tick = () => {
    const { timeOfNextSearch } = this.props;
    if (!timeOfNextSearch) {
      return;
    }

    const dateNumNextSearch = timeOfNextSearch.valueOf();

    this.setState({
      spinnerProgress: WatcherProgress.calculateProgress(
        dateNumNextSearch - Date.now(),
        WatcherProgress.calculateTimeBetweenStartAndEnd(
          this.state.startTime,
          dateNumNextSearch
        )
      )
    });
  };

  public render() {
    const { id, timeOfNextSearch } = this.props;
    const { spinnerProgress } = this.state;
    return timeOfNextSearch ? (
      <div style={{ paddingTop: '0.75em' }}>
        <ProgressSpinner id={id} progress={spinnerProgress} />
      </div>
    ) : null;
  }
}

export default connect(mapState)(WatcherProgress);
