import * as React from 'react';
import { TextStyle } from '@shopify/polaris';
import { calculateAcceptanceRate } from '../../utils/hitDatabase';
import { Tooltip } from '@blueprintjs/core';

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
      <Tooltip content="It's best to keep your acceptance rate above 99%. Good job!">
        <TextStyle variation="positive">{acceptanceRate.toFixed(3)}%</TextStyle>
      </Tooltip>
    ) : (
      <span>{acceptanceRate.toFixed(3)}%</span>
    );
  }
}

export default AcceptanceRateText;
