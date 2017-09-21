import * as React from 'react';
import { Stack } from '@shopify/polaris';

import TurkopticonSettings from '../TurkopticonSettings/TurkopticonSettings';
import AudioSettings from '../AudioSettings/AudioSettings';

const SearchTab = () => {
  return (
    <Stack vertical>
      <AudioSettings />
      <TurkopticonSettings />
    </Stack>
  );
};

export default SearchTab;
