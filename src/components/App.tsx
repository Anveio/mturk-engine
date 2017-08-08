import * as React from 'react';
import { Page, Stack, Banner } from '@shopify/polaris';

import HitTable from '../containers/HitTable';

export interface Handlers {
  readonly onFetch: () => void;
}

const App = ({ onFetch }: Handlers) => {
  return (
    <main>
      <Page
        title="Worker"
        primaryAction={{ content: 'Fetch Data', onAction: onFetch }}
      >
        <Stack vertical spacing="tight">
          <Banner />
          <HitTable />
        </Stack>
      </Page>
    </main>
  );
};

export default App;
