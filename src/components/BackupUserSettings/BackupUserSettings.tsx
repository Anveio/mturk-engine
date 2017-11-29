import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Card } from '@shopify/polaris';
import ExportUserSettings from './ExportUserSettings';
import ImportUserSettings from './ImportUserSettings';
import UploadedSettingsDisplay from './UploadedSettingsDisplay';
import { RootState } from '../../types';

interface Props {
  readonly fileUploaded: boolean;
}

class BackupUserSettings extends React.PureComponent<Props, never> {
  private static uploadedFileMarkup = () => (
    <Card>
      <UploadedSettingsDisplay />
    </Card>
  );

  public render() {
    return (
      <Layout.AnnotatedSection
        title="Backup Your Settings"
        description={`You 
      can download all of your settings as a single file to keep them backed up.`}
      >
        <Card sectioned>
          <ExportUserSettings />
        </Card>
        <Card sectioned>
          <ImportUserSettings />
        </Card>
        {this.props.fileUploaded
          ? BackupUserSettings.uploadedFileMarkup()
          : null}
      </Layout.AnnotatedSection>
    );
  }
}

const mapState = (state: RootState): Props => ({
  fileUploaded: !!state.uploadedState
});

export default connect(mapState)(BackupUserSettings);
