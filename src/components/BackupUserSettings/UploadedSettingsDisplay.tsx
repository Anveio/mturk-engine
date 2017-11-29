import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Stack, Banner } from '@shopify/polaris';
import { RootState, PersistedState } from '../../types';
import ConfirmImportButtons from './ConfirmImportButtons';

import { validUploadedState } from '../../selectors/uploadedState';

export interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

class UploadedSettingsDisplay extends React.Component<Props, never> {
  private displayKeys = (
    uploadedState: Partial<PersistedState>
  ): JSX.Element => {
    return Object.keys(uploadedState).length !== 0 ? (
      <Stack vertical>
        <Banner status="success" title="Uploaded file contains valid settings.">
          <p>
            You can upload the entire backup now or import only specific
            settings using the "Select Settings" button.
          </p>
        </Banner>
        <ConfirmImportButtons />
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

export default connect(mapState)(UploadedSettingsDisplay);
