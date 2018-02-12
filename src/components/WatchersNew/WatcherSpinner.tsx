import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
// import { Caption } from '@shopify/polaris';
import { Spinner, Classes, Intent } from '@blueprintjs/core';

interface OwnProps {
  readonly id: string;
  readonly isSelected: boolean;
}

interface Props {
  readonly timeNextSearch: Date | null;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

const mapState = (state: RootState, ownProps: OwnProps): Props => {
  const watcherTimer = state.watcherTimes.get(ownProps.id);
  return {
    timeNextSearch: (watcherTimer && watcherTimer.date) || null
  };
};

class WatcherTimer extends React.PureComponent<OwnProps & Props, State> {
  private static readonly tickRate: number = 100;
  private timerId: number;
  private dateNumNextSearch: number;
  private delay: number;

  public readonly state: State = { timeUntilNextSearch: null };

  componentDidMount() {
    const { timeNextSearch } = this.props;
    if (timeNextSearch) {
      this.dateNumNextSearch = timeNextSearch.valueOf();
      this.delay = WatcherTimer.calculateTimeUntilNextSearch(
        this.dateNumNextSearch
      );
      this.startTimer();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    clearInterval(this.timerId);
    if (nextProps.timeNextSearch) {
      this.dateNumNextSearch = nextProps.timeNextSearch.valueOf();
      this.delay = WatcherTimer.calculateTimeUntilNextSearch(
        this.dateNumNextSearch
      );
      this.startTimer();
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
    if (this.props.timeNextSearch) {
      this.setState({
        timeUntilNextSearch: WatcherTimer.calculateTimeUntilNextSearch(
          this.dateNumNextSearch
        )
      });
    }
  };

  public render() {
    const { timeNextSearch, isSelected } = this.props;
    const { timeUntilNextSearch } = this.state;

    const spinnerProgress =
      timeUntilNextSearch === null
        ? 0
        : WatcherTimer.calculateProgress(this.delay, timeUntilNextSearch);

    // console.log(progress);
    return timeNextSearch ? (
      <div style={{ paddingTop: '0.75em' }}>
        <Spinner
          className={Classes.SMALL}
          value={spinnerProgress}
          intent={isSelected ? Intent.WARNING : Intent.NONE}
        />
      </div>
    ) : null;
  }
}

export default connect(mapState)(WatcherTimer);
