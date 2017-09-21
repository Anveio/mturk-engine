import * as React from 'react';
import { Layout } from '@shopify/polaris';
import SearchTable from '../../containers/SearchTable';
import SearchBar from '../SearchBar/SearchBar';

const SearchTab = () => {
  return (
    <Layout.Section>
      <SearchBar />
      <SearchTable />
    </Layout.Section>
  );
};

export default SearchTab;
