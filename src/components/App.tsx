import * as React from 'react';
import { Page, Layout, Banner } from '@shopify/polaris';
import { SearchMap, SearchOptions } from '../types';
import ReduxToastr from 'react-redux-toastr';
import TabNavigation from '../containers/TabNavigation';

export interface Props {
  readonly selected: number;
  readonly search: SearchMap;
}

export interface Handlers {
  readonly onFetch: (options: SearchOptions) => void;
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const App = (props: Props & Handlers) => {
  const { search } = props;
  return (
    <main>
      <Page title="Mturk Engine">
        <Layout>
          <Layout.Section>
            <Banner status="info">Scanned {search.size} hits.</Banner>
          </Layout.Section>
          <TabNavigation />
        </Layout>
      </Page>
      <ReduxToastr
        timeOut={1000}
        position="top-right"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
      />
    </main>
  );
};

export default App;
