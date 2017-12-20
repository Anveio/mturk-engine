import * as React from 'react';
import { Layout } from '@shopify/polaris';
import TurkopticonSettings from '../TurkopticonSettings/TurkopticonSettings';
import AudioSettings from '../AudioSettings/AudioSettings';
import ToggleNoTO from '../TurkopticonSettings/ToggleNoTO';
import BackupUserSettings from '../BackupUserSettings/BackupUserSettings';

const SettingsTab: React.SFC<{}> = () => {
  return (
    <Layout>
      <BackupUserSettings />
      <AudioSettings />
      <ToggleNoTO />
      <TurkopticonSettings />
    </Layout>
  );
};

export default SettingsTab;
