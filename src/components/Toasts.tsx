import * as React from 'react';
import { Stack, Spinner, TextContainer } from '@shopify/polaris';

interface Props {
  readonly message: string;
}

export const GenericWaitingToast = ({ message }: Props) => (
  <Stack vertical={false} wrap={false}>
    <Spinner
      size="small"
      accessibilityLabel="Waiting for a response from MTurk."
    />
    <TextContainer>{message}</TextContainer>
  </Stack>
);
