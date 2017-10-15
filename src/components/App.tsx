import * as React from 'react';
import { Page } from '@shopify/polaris';
import ErrorBoundary from './ErrorBoundary';
import TabNavigation from '../containers/TabNavigation';
import CustomHead from '../containers/CustomHead';
import AudioLayer from './AudioLayer';
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
        <AudioLayer />
      </ErrorBoundary>
    </main>
  );
};

export default App;
