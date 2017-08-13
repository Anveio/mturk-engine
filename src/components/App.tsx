import * as React from 'react';
import { Page, Stack, Banner } from '@shopify/polaris';
import { HitMap, RequesterMap } from '../types';
import HitTable from './HitTable/HitTable';
import SearchForm from '../containers/SearchForm';

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
        title="Better Mturk"
        primaryAction={{ content: 'Fetch Data', onAction: onFetch }}
      >
        <Stack vertical spacing="tight">
          <Banner status="info">Scanned {hits.size} hits.</Banner>
          <SearchForm />
          <HitTable hits={hits} requesters={requesters} emptyAction={onFetch} />
        </Stack>
      </Page>
    </main>
  );
};

export default App;
