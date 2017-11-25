import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, Stack, Banner } from '@shopify/polaris';
import { RootState, PersistedState } from '../../types';
import { writePersistedState, WritePersistedState } from '../../actions/backup';
import StateKeyCheckboxList from './StateKeyCheckboxList';
import ConfirmImportButton from './ConfirmImportButton';

import { validUploadedState } from '../../selectors/uploadedState';

export interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

export interface Handlers {
  readonly saveFromBackup: (payload: Partial<PersistedState>) => void;
}

class UploadedSettingsDisplay extends React.Component<Props & Handlers, never> {
  private displayKeys = (uploadedState: Partial<PersistedState>) => {
    return Object.keys(uploadedState).length !== 0 ? (
      <Stack vertical>
        <Banner status="success" title="Uploaded file contains valid settings.">
          <p>
            You can choose which settings to import by checking the boxes below.
          </p>
        </Banner>
        <StateKeyCheckboxList uploadedState={uploadedState} />
        <ConfirmImportButton />
      </Stack>
    ) : (
      this.noValidKeysMarkup()
    );
  };

  private noValidKeysMarkup = () => (
    <Banner status="critical" title="The uploaded file contains no valid data.">
      <p>
        You won't be able to use this file to import any settings. Make sure you
        uploaded a valid Mturk Engine backup file and try again.
      </p>
    </Banner>
  );

  public render() {
    return this.props.uploadedState === null ? null : (
      <Card.Section>{this.displayKeys(this.props.uploadedState)}</Card.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  uploadedState: validUploadedState(state)
});

const mapDispatch = (dispatch: Dispatch<WritePersistedState>): Handlers => ({
  saveFromBackup: (payload: Partial<PersistedState>) =>
    dispatch(writePersistedState(payload))
});

export default connect(mapState, mapDispatch)(UploadedSettingsDisplay);
