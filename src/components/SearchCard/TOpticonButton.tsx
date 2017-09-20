import * as React from 'react';
import { Button } from '@shopify/polaris';
import { Tooltip } from '@blueprintjs/core';
import { TOpticonData, RequesterScores } from '../../types';
import { turkopticonBaseUrl } from '../../constants';

export interface Props {
  readonly requesterId: string;
  readonly turkopticon?: TOpticonData;
}

class TOpticonButton extends React.PureComponent<Props, never> {
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
        <Button plain external url={turkopticonBaseUrl + requesterId}>
          T.O. Page
        </Button>
      </Tooltip>
    ) : (
      <Button plain disabled external url={turkopticonBaseUrl + requesterId}>
        No T.O. data.
      </Button>
    );
  }
}

export default TOpticonButton;
