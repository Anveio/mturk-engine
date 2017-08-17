import * as React from 'react';
import { Tabs, Stack } from '@shopify/polaris';
import { HitMap, RequesterMap, SearchOptions } from '../../types';
import HitTable from '../HitTable/HitTable';
import Search from '../../containers/Search';
import { tabs } from '../../utils/tabs';

export interface Props {
  readonly selected: number;
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
  readonly options: SearchOptions;
}

export interface Handlers {
  readonly onSelectTab: (selectedTabIndex: number) => void;
  readonly onFetch: (options: SearchOptions) => void;
}

const TabNavigation = (props: Props & Handlers) => {
  const { onSelectTab, onFetch, selected, hits, requesters, options } = props;
  const fetchAction = () => onFetch(options);

  return (
    <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
      <Stack vertical spacing="loose">
        <Search />
        <HitTable hits={hits} requesters={requesters} emptyAction={fetchAction} />
      </Stack>
    </Tabs>
  );
};

export default TabNavigation;
