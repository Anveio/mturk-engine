import * as React from 'react';
import { Page } from '@shopify/polaris';
import ReduxToastr from 'react-redux-toastr';
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
