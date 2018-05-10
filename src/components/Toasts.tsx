import * as React from 'react';
import {
  Stack,
  Spinner,
  TextContainer,
  AppProvider as PolarisProvider
} from '@shopify/polaris';

interface Props {
  readonly message: string;
}

export const GenericWaitingToast = ({ message }: Props) => (
  <PolarisProvider>
    <Stack vertical={false} wrap={false}>
      <Spinner
        size="small"
        accessibilityLabel="Waiting for a response from MTurk."
      />
      <TextContainer>{message}</TextContainer>
    </Stack>
  </PolarisProvider>
);
