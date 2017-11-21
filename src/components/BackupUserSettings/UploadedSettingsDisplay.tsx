import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, FormLayout, Stack, Banner } from '@shopify/polaris';
import { RootState, PersistedState, PersistedStateKeys } from '../../types';
import { writePersistedState, WritePersistedState } from '../../actions/backup';
import StateKeyCheckbox from './StateKeyCheckbox';
import { validUploadedState } from '../../selectors/uploadedState';

export interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

export interface Handlers {
  readonly saveFromBackup: (payload: Partial<PersistedState>) => void;
}

export interface State {
  readonly checkedStateKeys: Map<PersistedStateKeys, boolean>;
}

class UploadedSettingsDisplay extends React.Component<Props & Handlers, never> {
  private displayKeys = (uploadedState: Partial<PersistedState>) => {
    return Object.keys(uploadedState).length !== 0 ? (
      <Stack vertical>
        <FormLayout>
          <Banner
            status="success"
            title="Uploaded file contains valid settings."
          >
            <p>
              You can choose which settings to import by checking the boxes
              below.
            </p>
          </Banner>
          {this.checkBoxList(uploadedState)}
        </FormLayout>
      </Stack>
    ) : (
      this.noValidKeysMarkup()
    );
  };

  private checkBoxList = (uploadedState: Partial<PersistedState>) =>
    Object.keys(uploadedState).map((stateKey: PersistedStateKeys) => (
      <StateKeyCheckbox
        key={stateKey}
        stateKey={stateKey}
        stateValue={uploadedState[stateKey]}
        checked
      />
    ));

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
