import * as React from 'react';
import { Caption } from '@shopify/polaris';
import { formatSecondsAsHhMmSs } from '../../utils/dates';

interface Props {
  readonly timeLeftInSeconds: number;
}

interface State {
  readonly secondsLeft: number;
}

class QueueTimer extends React.PureComponent<Props, State> {
  private static readonly tickRate = 500;
  private static readonly secondsPerTick = QueueTimer.tickRate / 1000;
  private timerId: number;

  constructor(props: Props) {
    super(props);
    this.state = { secondsLeft: props.timeLeftInSeconds };
  }

  static getDerivedStateFromProps(props: Props): Partial<State> {
    return {
      secondsLeft: props.timeLeftInSeconds
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  private startTimer = () => {
    clearInterval(this.timerId);
    this.timerId = window.setInterval(this.tick, QueueTimer.tickRate);
  };

  private tick = () =>
    this.setState((prevState: State) => ({
      secondsLeft: prevState.secondsLeft - 1 * QueueTimer.secondsPerTick
    }));

  public render() {
    return <Caption>{formatSecondsAsHhMmSs(this.state.secondsLeft)}</Caption>;
  }
}

export default QueueTimer;
