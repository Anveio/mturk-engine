import * as React from 'react';

import TurkopticonSettings from '../TurkopticonSettings/TurkopticonSettings';
import AudioSettings from '../AudioSettings/AudioSettings';

const SearchTab = () => {
  return (
    <div>
      <AudioSettings />
      <TurkopticonSettings />
    </div>
  );
};

export default SearchTab;
