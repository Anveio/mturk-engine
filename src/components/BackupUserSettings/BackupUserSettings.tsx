import * as React from 'react';
import { Layout, Card } from '@shopify/polaris';
import ExportUserSettings from './ExportUserSettings';
import ImportUserSettings from './ImportUserSettings';
import UploadedSettingsDisplay from './UploadedSettingsDisplay';

class BackupUserSettings extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Layout.AnnotatedSection
        title="Backup Your Settings"
        description={`You 
      can download all of your settings as a single file to keep them backed up.`}
      >
        <Card>
          <Card.Section>
            <ExportUserSettings />
          </Card.Section>
          <Card.Section>
            <ImportUserSettings />
          </Card.Section>
          <UploadedSettingsDisplay />
        </Card>
      </Layout.AnnotatedSection>
    );
  }
}

export default BackupUserSettings;

/* description={`Backing up and restoring your settings is simple and fast. 
        Settings can be shared between browsers and devices.`} */
