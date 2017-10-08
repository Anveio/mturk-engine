import * as React from 'react';
import { Layout } from '@shopify/polaris';
import UserInfo from './UserInfo';
import RejectionThreshold from './RejectionThreshold';
import Calendar from '../Calendar/Calendar';
import EarningsSummary from './EarningsSummary';

class ConnectedAccountLayout extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Layout>
        <Layout.Section secondary>
          <UserInfo />
          <RejectionThreshold />
        </Layout.Section>

        <Layout.Section secondary>
          <EarningsSummary />
        </Layout.Section>

        <Layout.Section>
          <Calendar />
        </Layout.Section>
      </Layout>
    );
  }
}

export default ConnectedAccountLayout;
