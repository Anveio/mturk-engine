import * as React from 'react';
import { Stack, Spinner, TextContainer } from '@shopify/polaris';

export interface Props {
  readonly progress: number;
}
const UploadProgressToast = ({ progress }: Props) => {
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
export default UploadProgressToast;

// const renderProgress = (amount: number): IToastProps => ({
//   iconName: 'cloud-upload',
//   message: ()
// });
