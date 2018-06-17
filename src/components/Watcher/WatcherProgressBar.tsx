import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { ProgressBar, Intent } from '@blueprintjs/core';

interface OwnProps {
  readonly id: string;
}

interface Props {
  readonly timeOfNextSearch: number | null;
  readonly watcherStartTime: number | null;
}

interface State {
  readonly spinnerProgress: number;
}

const mapState = (state: RootState, ownProps: OwnProps): Props => {
  const watcherTimer = state.watcherTimers.get(ownProps.id);

  if (!watcherTimer) {
    return {
      watcherStartTime: null,
      timeOfNextSearch: null
    };
  }

  return {
    timeOfNextSearch: watcherTimer.date.valueOf(),
    watcherStartTime: watcherTimer.origin
  };
};

class WatcherProgressBar extends React.PureComponent<OwnProps & Props, State> {
  private static readonly tickRate: number = 100;
  private timerId?: number;

  constructor(props: OwnProps & Props) {
    super(props);
    const { timeOfNextSearch, watcherStartTime } = props;

    if (!timeOfNextSearch || !watcherStartTime) {
      this.state = { spinnerProgress: 0 };
    } else {
      this.state = {
        spinnerProgress: WatcherProgressBar.calculateProgress(
          timeOfNextSearch - Date.now(),
          WatcherProgressBar.calculateTimeBetweenStartAndEnd(
            watcherStartTime,
            timeOfNextSearch
          )
        )
      };
    }
  }

  componentDidMount() {
    if (!!this.props.timeOfNextSearch) {
      this.startTimer();
    } else {
      this.cleanUp();
    }
  }

  componentDidUpdate() {
    if (!this.props.timeOfNextSearch) {
      this.setState({ spinnerProgress: 0 });
      this.cleanUp();
    }

    if (!!this.props.timeOfNextSearch && !this.timerId) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.cleanUp();
  }

  private cleanUp = () => {
    clearInterval(this.timerId);
    this.timerId = undefined;
  };

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
    if (total === 0 || timeLeft <= 0) {
      return 1;
    }

    return 1 - timeLeft / total;
  };

  private startTimer = () => {
    this.cleanUp();
    this.timerId = window.setInterval(this.tick, WatcherProgressBar.tickRate);
  };

  private tick = () => {
    const { timeOfNextSearch, watcherStartTime } = this.props;

    if (!timeOfNextSearch || !watcherStartTime) {
      return;
    }

    this.setState({
      spinnerProgress: WatcherProgressBar.calculateProgress(
        timeOfNextSearch - Date.now(),
        WatcherProgressBar.calculateTimeBetweenStartAndEnd(
          watcherStartTime,
          timeOfNextSearch
        )
      )
    });
  };

  public render() {
    return (
      <ProgressBar
        intent={this.state.spinnerProgress >= 1 ? Intent.PRIMARY : Intent.NONE}
        value={this.state.spinnerProgress}
      />
    );
  }
}

export default connect(mapState)(WatcherProgressBar);
