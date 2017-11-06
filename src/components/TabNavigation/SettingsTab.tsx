import * as React from 'react';

import TurkopticonSettings from '../TurkopticonSettings/TurkopticonSettings';
import AudioSettings from '../AudioSettings/AudioSettings';
import ToggleNoTO from '../TurkopticonSettings/ToggleNoTO';
import BackupUserSettings from '../BackupUserSettings/BackupUserSettings';

const SearchTab: React.SFC<{}> = () => {
  return (
    <div>
      <AudioSettings />
      <ToggleNoTO />
      <TurkopticonSettings />
      <BackupUserSettings />
    </div>
  );
};

export default SearchTab;
