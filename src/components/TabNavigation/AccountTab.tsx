import * as React from 'react';
import { Layout } from '@shopify/polaris';
import Account from '../Account/Account';
import Calendar from '../Calendar/Calendar';

class AccountTab extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Layout>
        <Layout.Section>
          <Calendar />
        </Layout.Section>
        <Account />
      </Layout>
    );
  }
}

export default AccountTab;
