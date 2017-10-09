import * as React from 'react';
import { Page } from '@shopify/polaris';
import TabNavigation from '../containers/TabNavigation';
import CustomHead from '../containers/CustomHead';
import AudioLayer from './AudioLayer';
import Footer from './Footer';

const App = () => {
  return (
    <main>
      <CustomHead />
      <Page title="Mturk Engine">
        <TabNavigation />
        <Footer />
      </Page>
      <AudioLayer />
    </main>
  );
};

export default App;
