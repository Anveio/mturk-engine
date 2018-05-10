import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';
import TabNavigation from './TabNavigation/TabNavigation';
import CustomHead from './CustomHead';
import NewResultAudioLayer from './NewResultAudioLayer';
import NewResultNotificationLayer from './NewResultNotificationLayer';
import Footer from './Footer';
import PageWrapper from './PageWrapper';
import { AppProvider } from '@shopify/polaris';

const App: React.SFC<{}> = () => (
  <main>
    <CustomHead />
    <AppProvider >
      <ErrorBoundary>
        <PageWrapper>
          <NewResultNotificationLayer>
            <NewResultAudioLayer>
              <TabNavigation />
              <Footer />
            </NewResultAudioLayer>
          </NewResultNotificationLayer>
        </PageWrapper>
      </ErrorBoundary>
    </AppProvider>
  </main>
);

export default App;
