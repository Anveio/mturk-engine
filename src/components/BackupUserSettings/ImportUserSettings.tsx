import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Stack, TextContainer, Button } from '@shopify/polaris';
import {
  UploadRequest,
  uploadRequest,
  removeUploadedFile
} from '../../actions/upload';

interface Handlers {
  readonly onUpload: (file: File) => void;
  readonly onRemoveUploadedFile: () => void;
}

interface State {
  readonly filename?: string;
}

class ImportUserSettings extends React.Component<Handlers, State> {
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

  private removeUploadedFile = () => {
    this.setState(() => ({ filename: '' }));
    this.props.onRemoveUploadedFile();
  };

  private clearUploadButton = (hasFile: boolean) =>
    hasFile ? (
      <Button plain onClick={this.removeUploadedFile}>
        Remove Uploaded File
      </Button>
    ) : null;

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
      <Stack alignment="baseline">
        <TextContainer>Upload Backup File</TextContainer>
        <label className="pt-file-input">
          <input type="file" onChange={this.uploadFile} accept=".json" />
          <span className="pt-file-upload-input">
            {this.generateInputText()}
          </span>
        </label>
        {this.clearUploadButton(!!this.state.filename)}
      </Stack>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<UploadRequest>): Handlers => ({
  onUpload: (file: File) => dispatch(uploadRequest(file)),
  onRemoveUploadedFile: () => dispatch(removeUploadedFile())
});

export default connect(null, mapDispatch)(ImportUserSettings);
