import * as React from 'react';
import { Page } from '@shopify/polaris';
import ErrorBoundary from './ErrorBoundary';
import TabNavigation from './TabNavigation/TabNavigation';
import CustomHead from './CustomHead';
import NewResultAudioLayer from './NewResultAudioLayer';
import NewResultNotificationLayer from './NewResultNotificationLayer';
import Footer from './Footer';

const App: React.SFC<{}> = () => {
  return (
    <main>
      <CustomHead />
      <ErrorBoundary>
        <Page title="Mturk Engine">
          <NewResultNotificationLayer>
            <NewResultAudioLayer>
              <TabNavigation />
              <Footer />
            </NewResultAudioLayer>
          </NewResultNotificationLayer>
        </Page>
      </ErrorBoundary>
    </main>
  );
};

export default App;
