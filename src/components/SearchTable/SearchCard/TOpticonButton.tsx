import * as React from 'react';
import { Tooltip, Button } from '@shopify/polaris';
import { TOpticonData, RequesterScores } from '../../../types';

export interface Props {
  readonly requesterId: string;
  readonly turkopticon?: TOpticonData;
}

class TOpticonButton extends React.PureComponent<Props, never> {
  static readonly topticonBaseUrl = 'https://turkopticon.ucsd.edu/';
  static generateTooltipContent = (scores: RequesterScores) =>
    `Pay: ${scores.pay}.
    Comm: ${scores.comm}. 
    Fair: ${scores.fair}. 
    Fast: ${scores.fast}.`;

  public render() {
    const { requesterId, turkopticon } = this.props;

    return turkopticon ? (
      <Tooltip
        content={TOpticonButton.generateTooltipContent(turkopticon.attrs)}
      >
        <Button
          plain
          external
          url={TOpticonButton.topticonBaseUrl + requesterId}
        >
          T.O. Page
        </Button>
      </Tooltip>
    ) : (
      <Button
        plain
        disabled
        external
        url={TOpticonButton.topticonBaseUrl + requesterId}
      >
        No T.O. data.
      </Button>
    );
  }
}

export default TOpticonButton;
