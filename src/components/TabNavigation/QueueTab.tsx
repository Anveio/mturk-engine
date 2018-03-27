import * as React from 'react';
import { Layout } from '@shopify/polaris';
import QueueDisclaimer from '../QueueTable/QueueDisclaimer';
import QueueTable from '../QueueTable/QueueTable';

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
