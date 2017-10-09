import * as React from 'react';
import { TextStyle } from '@shopify/polaris';
import { calculateAcceptanceRate } from '../../utils/hitDatabase';
import { Tooltip } from '@blueprintjs/core';

export interface Props {
  readonly lifetimeSubmitted: number;
  readonly lifetimeRejected: number;
}

class AcceptanceRateText extends React.PureComponent<Props, never> {
  static acceptanceRateText = (submitted: number, rejected: number) => {
    const acceptanceRate = calculateAcceptanceRate(submitted, rejected);
    return acceptanceRate > 99 ? (
      <Tooltip content="It's best to keep your acceptance rate above 99%. Good job!">
        <TextStyle variation="positive">{acceptanceRate.toFixed(3)}%</TextStyle>
      </Tooltip>
    ) : (
      <span>{acceptanceRate.toFixed(3)}%</span>
    );
  };

  public render() {
    const { lifetimeSubmitted, lifetimeRejected } = this.props;
    return AcceptanceRateText.acceptanceRateText(
      lifetimeSubmitted,
      lifetimeRejected
    );
  }
}

export default AcceptanceRateText;
