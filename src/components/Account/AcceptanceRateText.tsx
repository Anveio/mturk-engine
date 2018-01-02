import * as React from 'react';
import { TextStyle } from '@shopify/polaris';
import { calculateAcceptanceRate } from '../../utils/hitDatabase';

export interface Props {
  readonly lifetimeSubmitted: number;
  readonly lifetimeRejected: number;
}

class AcceptanceRateText extends React.PureComponent<Props, never> {
  public render() {
    const { lifetimeSubmitted, lifetimeRejected } = this.props;
    const acceptanceRate = calculateAcceptanceRate(
      lifetimeSubmitted,
      lifetimeRejected
    );

    return acceptanceRate > 99 ? (
      <TextStyle variation="positive">{acceptanceRate.toFixed(3)}%</TextStyle>
    ) : (
      <span>{acceptanceRate.toFixed(3)}%</span>
    );
  }
}

export default AcceptanceRateText;
