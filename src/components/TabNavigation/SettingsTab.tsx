import * as React from 'react';

import TurkopticonSettings from '../TurkopticonSettings/TurkopticonSettings';
import AudioSettings from '../AudioSettings/AudioSettings';
import ToggleNoTO from '../TurkopticonSettings/ToggleNoTO';

const SearchTab: React.SFC<{}> = () => {
  return (
    <div>
      <AudioSettings />
      <ToggleNoTO />
      <TurkopticonSettings />
    </div>
  );
};

export default SearchTab;
