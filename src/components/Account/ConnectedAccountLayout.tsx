import * as React from 'react';
import { Layout } from '@shopify/polaris';
import UserInfo from './UserInfo';
import Calendar from '../Calendar/Calendar';
import ImportantInfo from './ImportantInfo';

class ConnectedAccountLayout extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Layout>
        <UserInfo />
        <Layout.Section secondary>
          <ImportantInfo />
        </Layout.Section>
        <Layout.Section>
          <Calendar />
        </Layout.Section>
      </Layout>
    );
  }
}

export default ConnectedAccountLayout;
