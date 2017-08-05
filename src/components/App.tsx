import * as React from 'react';
import { Page, Stack, Banner } from '@shopify/polaris';

import HitTable from './HitTable/HitTable';

export interface Props {
  readonly data: HitTableEntry[];
}

export interface Handlers {
  readonly onFetch: () => void;
}

class App extends React.PureComponent<Props & Handlers, never> {
  render() {
    return (
      <main>
        <Page
          title="Worker"
          primaryAction={{ content: 'Fetch Data', onAction: this.props.onFetch }}
        >
          <Stack vertical spacing="tight">
            <Banner />
            <HitTable data={this.props.data} />
          </Stack>
        </Page>
      </main>
    );
  }
}

export default App;
