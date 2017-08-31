import * as React from 'react';
import { Card } from '@shopify/polaris';
import SearchSettings from '../../containers/SearchSettings';
import SearchButtons from '../../containers/SearchButtons';

const SearchBar = () => {
  return (
    <Card>
      <Card.Section>
        <SearchButtons />
      </Card.Section>

      <SearchSettings />
    </Card>
  );
};

export default SearchBar;
