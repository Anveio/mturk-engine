import * as React from 'react';
import { Page } from '@shopify/polaris';
import ErrorBoundary from './ErrorBoundary';
import TabNavigation from './TabNavigation/TabNavigation';
import CustomHead from './CustomHead';
import Footer from './Footer';

const App: React.SFC<{}> = () => {
  return (
    <main>
      <CustomHead />
      <ErrorBoundary>
        <Page title="Mturk Engine">
          <TabNavigation />
          <Footer />
        </Page>
      </ErrorBoundary>
    </main>
  );
};

export default App;
