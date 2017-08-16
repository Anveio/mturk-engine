import * as React from 'react';
import { Page, Tabs, Stack, Banner } from '@shopify/polaris';
import { HitMap, RequesterMap, SearchOptions } from '../types';
import HitTable from './HitTable/HitTable';
import Search from '../containers/Search';
import { tabs } from '../utils/tabs';

export interface Props {
  readonly selected: number;
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
  readonly options: SearchOptions;
}

export interface Handlers {
  readonly onFetch: (options: SearchOptions) => void;
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const App = (props: Props & Handlers) => {
  const { onSelectTab, selected, hits, requesters, options, onFetch } = props;
  const fetchAction = () => onFetch(options);

  return (
    <main>
      <Page
        title="Mturk Engine"
        primaryAction={{ content: 'Fetch Data', onAction: fetchAction }}
      >
        <Stack vertical>
          <Banner status="info">Scanned {hits.size} hits.</Banner>
          <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
            <Stack vertical spacing="loose">
              <Search />
              <HitTable
                hits={hits}
                requesters={requesters}
                emptyAction={fetchAction}
              />
            </Stack>
          </Tabs>
        </Stack>
      </Page>
    </main>
  );
};

export default App;
