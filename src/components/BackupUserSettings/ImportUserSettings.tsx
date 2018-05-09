import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Stack, TextContainer, Button } from '@shopify/polaris';
import {
  UploadRequest,
  uploadRequest,
  removeUploadedFile,
  RemoveUploadedFile
} from '../../actions/upload';
import { Classes } from '@blueprintjs/core';

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
    hasFile && (
      <Button plain onClick={this.removeUploadedFile}>
        Remove Uploaded File
      </Button>
    );

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
        <label className={`${Classes.FILE_INPUT}`}>
          <input type="file" onChange={this.uploadFile} accept=".json" />
          <span className={`${Classes.FILE_UPLOAD_INPUT}`}>
            {this.generateInputText()}
          </span>
        </label>
        {this.clearUploadButton(!!this.state.filename)}
      </Stack>
    );
  }
}

const mapDispatch = (
  dispatch: Dispatch<UploadRequest | RemoveUploadedFile>
): Handlers => ({
  onUpload: (file: File) => dispatch(uploadRequest(file)),
  onRemoveUploadedFile: () => dispatch(removeUploadedFile())
});

export default connect(null, mapDispatch)(ImportUserSettings);
