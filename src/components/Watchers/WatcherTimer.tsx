import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
// import { Caption } from '@shopify/polaris';
import { ProgressBar } from '@blueprintjs/core';

interface OwnProps {
  readonly groupId: string;
}

interface Props {
  readonly timeNextSearch: Date | null;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  timeNextSearch: state.watchers.get(ownProps.groupId).timeNextAttempt
});

class WatcherTimer extends React.PureComponent<OwnProps & Props, State> {
  static readonly tickRate: number = 100;
  private timerId: number;
  private dateNumNextSearch: number;
  private delay: number;

  constructor() {
    super();
    this.state = { timeUntilNextSearch: null };
  }

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

  static calculateTimeUntilNextSearch = (nextSearch: number): number => {
    return Math.max(nextSearch - Date.now(), 0);
  };

  static spinnerProgress = (delay: number, timeLeft: number): number => {
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

  private generateCaptionText = () => {
    const { timeNextSearch } = this.props;
    if (this.delay && timeNextSearch) {
      return (
        <ProgressBar
          value={WatcherTimer.spinnerProgress(this.delay, this.state
            .timeUntilNextSearch as number)}
        />
      );
    } else {
      return <div />;
    }
  };

  public render() {
    return this.generateCaptionText();
  }
}

export default connect(mapState)(WatcherTimer);
