import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { calculateSpinnerProgress } from 'utils/timers';

interface OwnProps {
  readonly id: string;
  readonly render: (progress: number, id: string) => JSX.Element;
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

class WatcherProgress extends React.Component<OwnProps & Props, State> {
  private static readonly tickRate: number = 100;
  private timerId?: number;

  constructor(props: OwnProps & Props) {
    super(props);
    const { timeOfNextSearch, watcherStartTime } = props;

    if (!timeOfNextSearch || !watcherStartTime) {
      this.state = { spinnerProgress: 0 };
    } else {
      this.state = {
        spinnerProgress: calculateSpinnerProgress(
          watcherStartTime,
          Date.now(),
          timeOfNextSearch
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

  private startTimer = () => {
    this.cleanUp();
    this.timerId = window.setInterval(this.tick, WatcherProgress.tickRate);
  };

  private tick = () => {
    const { timeOfNextSearch, watcherStartTime } = this.props;

    if (!timeOfNextSearch || !watcherStartTime) {
      return;
    }

    this.setState({
      spinnerProgress: calculateSpinnerProgress(
        watcherStartTime,
        Date.now(),
        timeOfNextSearch
      )
    });
  };

  public render() {
    const { timeOfNextSearch, render, id } = this.props;
    const { spinnerProgress } = this.state;
    return timeOfNextSearch && render(spinnerProgress, id);
  }
}

export default connect(mapState)(WatcherProgress);
