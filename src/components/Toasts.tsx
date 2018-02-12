import * as React from 'react';
import { Stack, Spinner, TextContainer } from '@shopify/polaris';

interface GenericProps {
  readonly message: string;
}

export const GenericWaitingToast = ({ message }: GenericProps) => (
  <Stack>
    <Spinner
      size="small"
      accessibilityLabel="Waiting for a response from MTurk."
    />
    <TextContainer>{message}</TextContainer>
  </Stack>
);

interface UploadProps {
  readonly progress: number;
}

export const UploadProgressToast = ({ progress }: UploadProps) => {
  return progress < 100 ? (
    <Stack>
      <Spinner
        size="small"
        accessibilityLabel="Your file has not finished uploading"
      />
      <TextContainer>Uploading your file...</TextContainer>
    </Stack>
  ) : (
    'File upload complete'
  );
};
