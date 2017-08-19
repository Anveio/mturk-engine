import * as React from 'react';
import { Page, Layout, Banner } from '@shopify/polaris';
import { SearchMap, RequesterMap, SearchOptions } from '../types';
import SearchContainer from '../containers/SearchContainer';
import TabNavigation from '../containers/TabNavigation';

export interface Props {
  readonly selected: number;
  readonly search: SearchMap;
  readonly requesters: RequesterMap;
  readonly options: SearchOptions;
}

export interface Handlers {
  readonly onFetch: (options: SearchOptions) => void;
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const App = (props: Props & Handlers) => {
  const { search, options, onFetch } = props;
  const fetchAction = () => onFetch(options);

  return (
    <main>
      <Page
        title="Mturk Engine"
        primaryAction={{ content: 'Fetch Data', onAction: fetchAction }}
      >
        <Layout>
          <Layout.Section>
            <Banner status="info">Scanned {search.size} hits.</Banner>
          </Layout.Section>
          <Layout.Section>
            <SearchContainer />
          </Layout.Section>
          <Layout.Section>
            <TabNavigation />
          </Layout.Section>
        </Layout>
      </Page>
    </main>
  );
};

export default App;
