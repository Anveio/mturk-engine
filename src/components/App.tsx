import * as React from 'react';
import { Page, Stack, Banner } from '@shopify/polaris';
import { HitMap, RequesterMap } from '../types';
import EmptyHitTable from './HitTable/EmptyHitTable';
import HitTable from './HitTable/HitTable';

export interface Props {
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
}

export interface Handlers {
  readonly onFetch: () => void;
}

const App = ({ hits, requesters, onFetch }: Props & Handlers) => {
  return (
    <main>
      <Page
        title="Worker"
        primaryAction={{ content: 'Fetch Data', onAction: onFetch }}
      >
        <Stack vertical spacing="tight">
          <Banner />
          {hits.isEmpty() ? (
            <EmptyHitTable onAction={onFetch} />
          ) : (
            <HitTable hits={hits} requesters={requesters} />
          )}
        </Stack>
      </Page>
    </main>
  );
};

export default App;
