import * as React from 'react';
import { Page, Stack, Banner } from '@shopify/polaris';

import HitTable from '../containers/HitTable';

export interface Handlers {
  readonly onFetch: () => void;
}

class App extends React.PureComponent<Handlers, never> {
  render() {
    return (
      <main>
        <Page
          title="Worker"
          primaryAction={{ content: 'Fetch Data', onAction: this.props.onFetch }}
        >
          <Stack vertical spacing="tight">
            <Banner />
            <HitTable />
          </Stack>
        </Page>
      </main>
    );
  }
}

export default App;
