import * as React from 'react';
import { Stack } from '@shopify/polaris';

import TurkopticonWeightForm from '../TurkopticonSettings/TurkopticonWeightForm';
import EnableMinimumTO from '../TurkopticonSettings/EnableMinimumTO';

const SearchTab = () => {
  return (
    <Stack vertical>
      <EnableMinimumTO />
      <TurkopticonWeightForm />
    </Stack>
  );
};

export default SearchTab;
