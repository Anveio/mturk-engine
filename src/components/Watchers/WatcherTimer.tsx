import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Caption } from '@shopify/polaris';

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
  static readonly tickRate: number = 50;
  private timerId: number;
  private dateNumNextSearch: number;

  constructor() {
    super();
    this.state = { timeUntilNextSearch: null };
  }

  componentDidMount() {
    if (this.props.timeNextSearch) {
      this.dateNumNextSearch = this.props.timeNextSearch.valueOf();
      this.startTimer();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.timeNextSearch) {
      clearInterval(this.timerId);
      this.dateNumNextSearch = nextProps.timeNextSearch.valueOf();
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  static calculateTimeUntilNextSearch = (nextSearch: number): number => {
    return Math.max(nextSearch - Date.now(), 0);
  };

  static formatAsSeconds = (milliseconds: number, sigFigs = 2): string => {
    return (milliseconds / 1000).toFixed(sigFigs);
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
    if (this.dateNumNextSearch && timeNextSearch) {
      return (
        <Caption>
          Next search in{' '}
          {WatcherTimer.formatAsSeconds(this.state
            .timeUntilNextSearch as number)}{' '}
          seconds.
        </Caption>
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
