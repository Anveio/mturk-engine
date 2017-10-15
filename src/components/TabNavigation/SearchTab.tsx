import * as React from 'react';
import { Layout } from '@shopify/polaris';
import SearchTable from '../../containers/SearchTable';
import SearchButtons from '../../containers/SearchButtons';

const SearchTab: React.SFC<{}> = () => {
  return (
    <Layout>
      <Layout.Section>
        <SearchButtons />
      </Layout.Section>
      <Layout.Section>
        <SearchTable />
      </Layout.Section>
    </Layout>
  );
};

export default SearchTab;
