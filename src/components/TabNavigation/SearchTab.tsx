import * as React from 'react';
import { Stack } from '@shopify/polaris';
import SearchTable from '../../containers/SearchTable';
import SearchBar from '../../containers/SearchBar';

const SearchTab = () => {
  return (
    <Stack vertical>
      <SearchBar />
      <SearchTable />
    </Stack>
  );
};

export default SearchTab;
