import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { UploadRequest, uploadRequest } from '../../actions/upload';
// import { uploadDataFromFile } from '../../utils/backup';

interface Props {}

interface Handlers {
  readonly onUpload: (file: File) => void;
}

interface State {
  readonly filename?: string;
}

class ImportUserSettings extends React.Component<Props & Handlers, State> {
  public readonly state: State = {};

  private generateInputText = () => {
    return this.state.filename ? this.state.filename : 'Choose file...';
  };

  private updateFileName = (file: File) => {
    this.setState({
      filename: file.name
    });
  };

  private uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const file = ImportUserSettings.validateFileUpload(event);
    if (file) {
      this.updateFileName(file);
      this.props.onUpload(file);
    }
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
        <input type="file" onChange={this.uploadFile} accept=".json" />
        <span className="pt-file-upload-input">{this.generateInputText()}</span>
      </label>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<UploadRequest>): Handlers => ({
  onUpload: (file: File) => dispatch(uploadRequest(file))
});

export default connect(null, mapDispatch)(ImportUserSettings);
