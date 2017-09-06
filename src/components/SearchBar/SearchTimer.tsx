import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Caption } from '@shopify/polaris';

interface Props {
  readonly timeNextSearch: Date | null;
  readonly waitingForMturk: boolean;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

const mapState = (state: RootState): Props => ({
  timeNextSearch: state.timeNextSearch,
  waitingForMturk: state.waitingForMturk
});

class SearchTimer extends React.PureComponent<Props, State> {
  static readonly tickRate: number = 50;
  private timerId: number;
  private dateNumNextSearch: number;

  constructor(props: Props) {
    super(props);
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
    this.timerId = window.setInterval(() => this.tick(), SearchTimer.tickRate);
  };

  private tick = () => {
    if (this.props.timeNextSearch) {
      this.setState({
        timeUntilNextSearch: SearchTimer.calculateTimeUntilNextSearch(
          this.dateNumNextSearch
        )
      });
    }
  };

  private generateCaptionText = () => {
    const { waitingForMturk, timeNextSearch } = this.props;
    if (waitingForMturk) {
      return <Caption>Waiting for Mturk response...</Caption>;
    } else if (this.dateNumNextSearch && timeNextSearch) {
      return (
        <Caption>
          Next search in{' '}
          {SearchTimer.formatAsSeconds(this.state
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

export default connect(mapState)(SearchTimer);
