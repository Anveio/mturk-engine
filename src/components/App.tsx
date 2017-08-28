import * as React from 'react';
import { Page, Layout } from '@shopify/polaris';
import ReduxToastr from 'react-redux-toastr';
import TabNavigation from '../containers/TabNavigation';

const App = () => {
  return (
    <main>
      <Page title="Mturk Engine">
        <Layout>
          <Layout.Section>
            <TabNavigation />
          </Layout.Section>
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
