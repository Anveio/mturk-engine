import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';
import TabNavigation from './TabNavigation/TabNavigation';
import CustomHead from './CustomHead';
import NewResultAudioLayer from './NewResultAudioLayer';
import NewResultNotificationLayer from './NewResultNotificationLayer';
import Footer from './Footer';
import PageWrapper from './PageWrapper';

const App: React.SFC<{}> = () => (
  <main>
    <CustomHead />
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
  </main>
);

export default App;
