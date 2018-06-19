import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';
import TabNavigation from './TabNavigation/TabNavigation';
import CustomHead from './CustomHead';
import NewResultAudioLayer from './NewResultAudioLayer';
import Footer from './Footer';
import PageWrapper from './PageWrapper';

const App: React.SFC<{}> = () => (
  <main>
    <CustomHead />
    <ErrorBoundary>
      <PageWrapper>
        <NewResultAudioLayer>
          <TabNavigation />
          <Footer />
        </NewResultAudioLayer>
      </PageWrapper>
    </ErrorBoundary>
  </main>
);

export default App;
