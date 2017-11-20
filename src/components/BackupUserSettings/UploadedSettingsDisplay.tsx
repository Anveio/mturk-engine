import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card } from '@shopify/polaris';
import { RootState, PersistedState } from '../../types';
import { writePersistedState, WritePersistedState } from '../../actions/backup';

export interface Props {
  readonly uploadedState: Partial<PersistedState> | null;
}

export interface Handlers {
  readonly saveFromBackup: (payload: Partial<PersistedState>) => void;
}

class UploadedSettingsDisplay extends React.Component<Props & Handlers, never> {
  private displayKeys = (uploadedState: Partial<PersistedState>) =>
    Object.keys(uploadedState).map(key => <div key={key}>{key}</div>);

  public render() {
    return this.props.uploadedState ? (
      <Card.Section>{this.displayKeys(this.props.uploadedState)}</Card.Section>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  uploadedState: state.uploadedState
});

const mapDispatch = (dispatch: Dispatch<WritePersistedState>): Handlers => ({
  saveFromBackup: (payload: Partial<PersistedState>) =>
    dispatch(writePersistedState(payload))
});

export default connect(mapState, mapDispatch)(UploadedSettingsDisplay);
