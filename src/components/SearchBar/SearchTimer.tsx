import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { TextContainer, Stack, Spinner } from '@shopify/polaris';

interface Props {
  readonly searchingActive: boolean;
  readonly timeNextSearch: number | null;
  readonly waitingForMturk: boolean;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

class SearchTimer extends React.PureComponent<Props, State> {
  private static readonly tickRate: number = 50;
  private timerId: number | undefined;
  public readonly state: State = SearchTimer.defaultState;

  constructor(props: Props) {
    super(props);
    this.state = SearchTimer.defaultState;
  }

  private static defaultState: State = {
    timeUntilNextSearch: null
  };

  componentDidUpdate() {
    if (!this.props.timeNextSearch) {
      this.cleanUp();
    }

    if (!this.timerId) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.cleanUp();
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

  private cleanUp = () => {
    clearInterval(this.timerId);
    this.timerId = undefined;
  };

  private startTimer = () => {
    this.cleanUp();
    this.timerId = window.setInterval(this.tick, SearchTimer.tickRate);
  };

  private tick = () => {
    if (!this.props.timeNextSearch) {
      return;
    }

    this.setState({
      timeUntilNextSearch: SearchTimer.calculateTimeUntilNextSearch(
        this.props.timeNextSearch
      )
    });
  };

  static waitingForMturkMarkup = () => (
    <Stack vertical={false} spacing="tight" wrap={false}>
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

  public render() {
    const { waitingForMturk, searchingActive } = this.props;

    if (waitingForMturk) {
      return SearchTimer.waitingForMturkMarkup();
    } else if (this.state.timeUntilNextSearch && searchingActive) {
      return SearchTimer.waitingForNextSearchMarkup(
        this.state.timeUntilNextSearch
      );
    } else {
      // tslint:disable
      console.log('rendering nothing');
      return null;
    }
  }
}

const mapState = (state: RootState): Props => ({
  searchingActive: state.searchingActive,
  timeNextSearch: state.timeNextSearch && state.timeNextSearch.valueOf(),
  waitingForMturk: state.waitingForMturk
});

export default connect(mapState)(SearchTimer);
