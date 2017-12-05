import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { TextContainer, Stack, Spinner } from '@shopify/polaris';

interface Props {
  readonly timeNextSearch: Date | null;
  readonly waitingForMturk: boolean;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

class SearchTimer extends React.PureComponent<Props, State> {
  private static readonly tickRate: number = 50;
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

  private static calculateTimeUntilNextSearch = (
    nextSearch: number
  ): number => {
    return Math.max(nextSearch - Date.now(), 0);
  };

  private static formatAsSeconds = (
    milliseconds: number,
    sigFigs = 2
  ): string => {
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

  static waitingForMturkMarkup = () => (
    <Stack vertical={false} spacing="extraTight">
      <Spinner size="small" />
      <TextContainer>Waiting for Mturk response...</TextContainer>
    </Stack>
  );

  static waitingForNextSearchMarkup = (timeUntilNextSearch: number) => (
    <TextContainer>
      Next search in {SearchTimer.formatAsSeconds(timeUntilNextSearch)} seconds.
    </TextContainer>
  );

  private generateCaptionText = () => {
    const { waitingForMturk, timeNextSearch } = this.props;
    const { timeUntilNextSearch } = this.state;
    if (waitingForMturk) {
      return SearchTimer.waitingForMturkMarkup();
    } else if (
      this.dateNumNextSearch &&
      timeNextSearch &&
      timeUntilNextSearch
    ) {
      return SearchTimer.waitingForNextSearchMarkup(timeUntilNextSearch);
    } else {
      return null;
    }
  };

  public render() {
    return this.generateCaptionText();
  }
}

const mapState = (state: RootState): Props => ({
  timeNextSearch: state.timeNextSearch,
  waitingForMturk: state.waitingForMturk
});

export default connect(mapState)(SearchTimer);
