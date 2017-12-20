import * as React from 'react';
import { Layout } from '@shopify/polaris';
import BackupUserSettings from '../BackupUserSettings/BackupUserSettings';
import AudioSettings from '../AudioSettings/AudioSettings';
import ToggleNoTO from '../TurkopticonSettings/ToggleNoTO';
import MinTOsection from '../TurkopticonSettings/MinTOsection';
import TurkopticonWeightForm from '../TurkopticonSettings/TurkopticonWeightForm';


const SettingsTab: React.SFC<{}> = () => {
  return (
    <Layout>
      <BackupUserSettings />
      <AudioSettings />
      <ToggleNoTO />
      <MinTOsection />
      <TurkopticonWeightForm />
    </Layout>
  );
};

export default SettingsTab;
