import * as React from 'react';
import { Button, Stack, TextContainer } from '@shopify/polaris';
import { Tooltip } from '@blueprintjs/core';
import { RequesterInfo } from '../../types';
import { turkopticonBaseUrl } from '../../constants/urls';

export interface Props {
  readonly requesterId: string;
  readonly turkopticon?: RequesterInfo;
}

class TOpticonButton extends React.PureComponent<Props, never> {
  private static generateTooltipContent = (data: RequesterInfo) => {
    const { numTosFlags, numReviews, scores: { comm, fair, fast, pay } } = data;

    return (
      <Stack vertical>
        <TextContainer>{numTosFlags} reported TOS violations.</TextContainer>
        <TextContainer>
          Pay: {pay}. Comm: {comm}. Fair: {fair}. Fast: {fast}.
        </TextContainer>
        <TextContainer>Calculated from {numReviews} reviews.</TextContainer>
      </Stack>
    );
  };

  public render() {
    const { requesterId, turkopticon } = this.props;

    return turkopticon ? (
      <Tooltip content={TOpticonButton.generateTooltipContent(turkopticon)}>
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
