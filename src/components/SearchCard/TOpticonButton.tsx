import * as React from 'react';
import { Button, Stack, TextContainer } from '@shopify/polaris';
import { Tooltip } from '@blueprintjs/core';
import { TOpticonRequester } from '../../types';
import { turkopticonBaseUrl } from '../../constants/urls';

export interface Props {
  readonly requesterId: string;
  readonly turkopticon?: TOpticonRequester;
}

class TOpticonButton extends React.PureComponent<Props, never> {
  private static generateTooltipContent = (data: TOpticonRequester) => {
    const { attrs: { pay, comm, fair, fast }, reviews, tos_flags } = data;

    return (
      <Stack vertical>
        <TextContainer>{tos_flags} reported TOS violations.</TextContainer>
        <TextContainer>
          Pay: {pay}. Comm: {comm}. Fair: {fair}. Fast: {fast}.
        </TextContainer>
        <TextContainer>Calculated from {reviews} reviews.</TextContainer>
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
