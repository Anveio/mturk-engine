import * as React from 'react';
import { Page, Stack, Banner } from '@shopify/polaris';
import { HitMap, RequesterMap, SearchOptions } from '../types';
import HitTable from './HitTable/HitTable';
import Search from '../containers/Search';

export interface Props {
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
  readonly options: SearchOptions;
}

export interface Handlers {
  readonly onFetch: (options: SearchOptions) => void;
}

const App = ({ hits, requesters, options, onFetch }: Props & Handlers) => {
  const fetchAction = () => onFetch(options);

  return (
    <main>
      <Page
        title="Better Mturk"
        primaryAction={{ content: 'Fetch Data', onAction: fetchAction }}
      >
        <Stack vertical spacing="tight">
          <Banner status="info">Scanned {hits.size} hits.</Banner>
          <Search />
          <HitTable hits={hits} requesters={requesters} emptyAction={fetchAction} />
        </Stack>
      </Page>
    </main>
  );
};

export default App;
