import * as React from 'react';
import { Layout } from '@shopify/polaris';
import SearchTable from '../SearchTable/SearchTable';
import SearchBar from '../SearchBar/SearchBar';

const SearchTab: React.SFC<{}> = () => {
  return (
    <Layout>
      <Layout.Section>
        <SearchBar />
      </Layout.Section>
      <Layout.Section>
        <SearchTable />
      </Layout.Section>
    </Layout>
  );
};

export default SearchTab;
