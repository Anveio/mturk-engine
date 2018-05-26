import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';
import TabNavigation from './TabNavigation/TabNavigation';
import CustomHead from './CustomHead';
import NewResultAudioLayer from './NewResultAudioLayer';
import Footer from './Footer';
import PageWrapper from './PageWrapper';
import { AppProvider as PolarisProvider } from '@shopify/polaris';

const App: React.SFC<{}> = () => (
  <main>
    <CustomHead />
    <PolarisProvider>
      <ErrorBoundary>
        <PageWrapper>
          <NewResultAudioLayer>
            <TabNavigation />
            <Footer />
          </NewResultAudioLayer>
        </PageWrapper>
      </ErrorBoundary>
    </PolarisProvider>
  </main>
);

export default App;
