import * as React from 'react';
import { Layout } from '@shopify/polaris';
import UserInfo from './UserInfo';
import Calendar from '../Calendar/Calendar';

class ConnectedAccountLayout extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Layout>
        <UserInfo />
        <UserInfo />
        <Layout.Section>
          <Calendar />
        </Layout.Section>
      </Layout>
    );
  }
}

export default ConnectedAccountLayout;
