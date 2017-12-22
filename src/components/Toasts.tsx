import * as React from 'react';
import { Stack, Spinner, TextContainer } from '@shopify/polaris';
import { connect, Dispatch } from 'react-redux';
import { AddWatcher, addWatcher } from '../actions/watcher';
import { watcherFromId } from '../utils/watchers';

interface GenericProps {
  readonly message: string;
}

export const GenericWaitingToast = ({ message }: GenericProps) => (
  <Stack>
    <Spinner
      size="small"
      accessibilityLabel="Waiting for a response from MTurk."
    />
    <TextContainer>{message}.</TextContainer>
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

interface Handlers {
  readonly onAddWatcher: (groupId: string) => void;
}

interface Props {
  readonly groupId: string;
}

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (groupId: string) =>
    dispatch(addWatcher(watcherFromId(groupId)))
});

class AddWatcherToast extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <Stack>
        <TextContainer>Couldn't add that HIT to your queue.</TextContainer>
      </Stack>
    );
  }
}

export const AddUnacceptedHitAsWatcher = connect(null, mapDispatch)(
  AddWatcherToast
);
