import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ReadPersistedState, readPersistedState } from '../../actions/backup';

export interface Props {}

export interface Handlers {
  readonly onExport: () => void;
}

class ImportUserSettings extends React.Component<Props & Handlers, never> {
  public render() {
    return (
      <label className="pt-file-upload .modifier">
        <input type="file" />
        <span className="pt-file-upload-input">Choose file...</span>
      </label>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ReadPersistedState>): Handlers => ({
  onExport: () => dispatch(readPersistedState())
});

export default connect(null, mapDispatch)(ImportUserSettings);
