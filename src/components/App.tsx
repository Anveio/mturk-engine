import * as React from 'react';
import { Page, Layout } from '@shopify/polaris';
import { SearchOptions } from '../types';
import ReduxToastr from 'react-redux-toastr';
import TabNavigation from '../containers/TabNavigation';

export interface Props {
  readonly selected: number;
}

export interface Handlers {
  readonly onFetch: (options: SearchOptions) => void;
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const App = (props: Props & Handlers) => {
  return (
    <main>
      <Page title="Mturk Engine">
        <Layout>
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
