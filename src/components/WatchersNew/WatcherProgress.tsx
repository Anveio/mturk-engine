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
  readonly timeUntilNextSearch: number | null;
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
  private dateNumNextSearch: number;
  private delay: number;

  public readonly state: State = { timeUntilNextSearch: null };

  componentDidMount() {
    const { timeOfNextSearch } = this.props;
    if (timeOfNextSearch) {
      this.dateNumNextSearch = timeOfNextSearch.valueOf();
      this.delay = WatcherProgress.calculateTimeUntilNextSearch(
        this.dateNumNextSearch
      );
      this.startTimer();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    clearInterval(this.timerId);
    if (nextProps.timeOfNextSearch) {
      this.dateNumNextSearch = nextProps.timeOfNextSearch.valueOf();
      this.delay = WatcherProgress.calculateTimeUntilNextSearch(
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
    this.timerId = window.setInterval(
      () => this.tick(),
      WatcherProgress.tickRate
    );
  };

  private tick = () => {
    if (this.props.timeOfNextSearch) {
      this.setState({
        timeUntilNextSearch: WatcherProgress.calculateTimeUntilNextSearch(
          this.dateNumNextSearch
        )
      });
    }
  };

  public render() {
    const { id, timeOfNextSearch } = this.props;
    const { timeUntilNextSearch } = this.state;

    const spinnerProgress =
      timeUntilNextSearch === null
        ? 0
        : WatcherProgress.calculateProgress(this.delay, timeUntilNextSearch);

    // console.log(progress);
    return timeOfNextSearch ? (
      <div style={{ paddingTop: '0.75em' }}>
        <ProgressSpinner id={id} progress={spinnerProgress} />
      </div>
    ) : null;
  }
}

export default connect(mapState)(WatcherProgress);
