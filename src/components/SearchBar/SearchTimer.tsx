import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { TextContainer, Stack, Spinner } from '@shopify/polaris';

interface Props {
  readonly timeNextSearch: Date | null;
  readonly waitingForMturk: boolean;
}

interface State {
  readonly memoizedDateNumNextSearch: number | null;
  readonly timeUntilNextSearch: number | null;
}

class SearchTimer extends React.PureComponent<Props, State> {
  private static readonly tickRate: number = 50;
  private timerId: number;
  public readonly state: State = SearchTimer.defaultState;

  constructor(props: Props) {
    super(props);
    this.state = SearchTimer.defaultState;
  }

  private static defaultState: State = {
    memoizedDateNumNextSearch: null,
    timeUntilNextSearch: null
  };

  static getDerivedStateFromProps(nextProps: Props): Partial<State> {
    if (!nextProps.timeNextSearch) {
      return SearchTimer.defaultState;
    }

    const memoizedDateNumNextSearch = nextProps.timeNextSearch.valueOf();

    const timeUntilNextSearch = SearchTimer.calculateTimeUntilNextSearch(
      memoizedDateNumNextSearch
    );

    return {
      timeUntilNextSearch,
      memoizedDateNumNextSearch
    };
  }

  componentDidMount() {
    this.startTimer();
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
    clearInterval(this.timerId);
    this.timerId = window.setInterval(() => this.tick(), SearchTimer.tickRate);
  };

  private tick = () => {
    if (!this.state.memoizedDateNumNextSearch) {
      return;
    }

    this.setState({
      timeUntilNextSearch: SearchTimer.calculateTimeUntilNextSearch(
        this.state.memoizedDateNumNextSearch
      )
    });
  };

  static waitingForMturkMarkup = () => (
    <Stack vertical={false} spacing="extraTight">
      <Spinner size="small" />
      <TextContainer>Waiting for Mturk response...</TextContainer>
    </Stack>
  );

  static waitingForNextSearchMarkup = (timeUntilNextSearch: number) => {
    return (
      <TextContainer>
        Next search in {SearchTimer.formatAsSeconds(timeUntilNextSearch)}{' '}
        seconds.
      </TextContainer>
    );
  };

  private generateTimerText = () => {
    const { waitingForMturk, timeNextSearch } = this.props;
    if (waitingForMturk) {
      return SearchTimer.waitingForMturkMarkup();
    } else if (timeNextSearch && this.state.timeUntilNextSearch) {
      return SearchTimer.waitingForNextSearchMarkup(
        this.state.timeUntilNextSearch
      );
    } else {
      return null;
    }
  };

  public render() {
    return this.generateTimerText();
  }
}

const mapState = (state: RootState): Props => ({
  timeNextSearch: state.timeNextSearch,
  waitingForMturk: state.waitingForMturk
});

export default connect(mapState)(SearchTimer);
