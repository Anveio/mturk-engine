import * as React from 'react';
import { Layout } from '@shopify/polaris';
import BackupUserSettings from '../BackupUserSettings/BackupUserSettings';
import AudioSettings from '../AudioSettings/AudioSettings';
import ToggleNoTO from '../TurkopticonSettings/ToggleNoTO';
import MinTOsection from '../TurkopticonSettings/MinTOsection';
import TurkopticonWeightForm from '../TurkopticonSettings/TurkopticonWeightForm';
import ToggleLegacyLinks from './ToggleLegacyLinks';

const SettingsTab: React.SFC<{}> = () => {
  return (
    <Layout>
      <BackupUserSettings />
      <ToggleLegacyLinks />
      <AudioSettings />
      <TurkopticonWeightForm />
      <MinTOsection />
      <ToggleNoTO />
    </Layout>
  );
};

export default SettingsTab;
