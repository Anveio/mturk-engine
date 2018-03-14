import * as React from 'react';
import { Caption } from '@shopify/polaris';
import { displaySecondsAsHHMMSS } from '../../utils/dates';

interface Props {
  readonly initialTimeLeft: number;
}

interface State {
  readonly secondsUntilExpiration: number;
}

class QueueTimer extends React.PureComponent<Props, State> {
  private static readonly tickRate = 500;
  private timerId: number;
  private dateNumExpiration: number;

  constructor(props: Props) {
    super(props);
    this.state = { secondsUntilExpiration: props.initialTimeLeft };
  }

  componentDidMount() {
    this.resetDateNumExpiration(this.props.initialTimeLeft);
    this.startTimer();
  }

  componentWillReceiveProps({ initialTimeLeft }: Props) {
    clearInterval(this.timerId);
    this.resetDateNumExpiration(initialTimeLeft);
    this.startTimer();
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  private resetDateNumExpiration = (timeLeft: number) =>
    (this.dateNumExpiration = Date.now() + timeLeft * 1000);

  private startTimer = () =>
    (this.timerId = window.setInterval(() => this.tick(), QueueTimer.tickRate));

  private tick = () =>
    this.setState({
      secondsUntilExpiration: (this.dateNumExpiration - Date.now()) / 1000
    });

  public render() {
    return (
      <Caption>
        {displaySecondsAsHHMMSS(this.state.secondsUntilExpiration)}
      </Caption>
    );
  }
}

export default QueueTimer;
