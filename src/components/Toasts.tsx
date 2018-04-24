import * as React from 'react';
import { Stack, Spinner, TextContainer } from '@shopify/polaris';

interface GenericProps {
  readonly message: string;
}

export const GenericWaitingToast = ({ message }: GenericProps) => (
  <Stack vertical={false} wrap={false}>
    <Spinner
      size="small"
      accessibilityLabel="Waiting for a response from MTurk."
    />
    <TextContainer>{message}</TextContainer>
  </Stack>
);
