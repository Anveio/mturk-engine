import * as React from 'react';
import { Layout } from '@shopify/polaris';
import QueueTable from '../Queue/QueueTable';

const QueueTab: React.SFC<{}> = () => {
  return (
    <Layout>
      <Layout.Section>
        <QueueTable />
      </Layout.Section>
    </Layout>
  );
};

export default QueueTab;
