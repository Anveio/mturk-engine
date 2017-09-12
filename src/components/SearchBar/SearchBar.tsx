import * as React from 'react';
import { Card } from '@shopify/polaris';
import SearchSettings from '../../containers/SearchSettings';
import SearchButtons from '../../containers/SearchButtons';
import TurkopticonSettings from '../../containers/TurkopticonSettings';

const SearchBar = () => {
  return (
    <Card>
      <Card.Section>
        <SearchButtons />
      </Card.Section>
      <SearchSettings />
      <TurkopticonSettings />
    </Card>
  );
};

export default SearchBar;
