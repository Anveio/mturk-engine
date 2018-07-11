import * as React from 'react';
import { Layout, Card } from '@shopify/polaris';
import SearchTable from '../SearchTable/SearchTable';
import SearchBar from '../SearchBar/SearchBar';

const SearchTab: React.SFC<{}> = () => {
  return (
    <Layout>
      <Layout.Section>
        <Card>
          <SearchBar />
          <SearchTable />
        </Card>
      </Layout.Section>
    </Layout>
  );
};

export default SearchTab;
