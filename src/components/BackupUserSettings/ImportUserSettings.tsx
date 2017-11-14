import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ReadPersistedState, readPersistedState } from '../../actions/backup';

interface Props {}

interface Handlers {
  readonly onExport: () => void;
}

interface State {
  readonly filename?: string;
}

class ImportUserSettings extends React.Component<Props & Handlers, State> {
  public readonly state: State = {};

  private generateInputText = () => {
    return this.state.filename ? this.state.filename : 'Choose file...';
  };

  private updateFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const file = ImportUserSettings.validateFileUpload(event);
    this.setState((): Partial<State> => {
      return file ? { filename: file.name } : {};
    });
  };

  static validateFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const fileList = event.target.files;
      return fileList.item(fileList.length - 1);
    } else {
      return null;
    }
  };

  public render() {
    return (
      <label className="pt-file-upload">
        <input type="file" onChange={this.updateFileName} accept=".bak" />
        <span className="pt-file-upload-input">{this.generateInputText()}</span>
      </label>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ReadPersistedState>): Handlers => ({
  onExport: () => dispatch(readPersistedState())
});

export default connect(null, mapDispatch)(ImportUserSettings);
