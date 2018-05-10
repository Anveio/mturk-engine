import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';
import TabNavigation from './TabNavigation/TabNavigation';
import CustomHead from './CustomHead';
import NewResultAudioLayer from './NewResultAudioLayer';
import NewResultNotificationLayer from './NewResultNotificationLayer';
import Footer from './Footer';
import PageWrapper from './PageWrapper';
import { AppProvider as PolarisProvider } from '@shopify/polaris';

const App: React.SFC<{}> = () => (
  <main>
    <CustomHead />
    <PolarisProvider>
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
    </PolarisProvider>
  </main>
);

export default App;
