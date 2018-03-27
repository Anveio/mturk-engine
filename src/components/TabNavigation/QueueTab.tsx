import * as React from 'react';
import { Layout } from '@shopify/polaris';
import QueueTable from '../Queue/QueueTable';
import QueueDisclaimer from '../Queue/QueueDisclaimer';

const QueueTab: React.SFC<{}> = () => {
  return (
    <Layout>
      <QueueDisclaimer />
      <Layout.Section>
        <QueueTable />
      </Layout.Section>
    </Layout>
  );
};

export default QueueTab;
