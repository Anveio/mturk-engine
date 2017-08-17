import * as React from 'react';
import { Tabs, Stack } from '@shopify/polaris';
import HitTable from '../../containers/HitTable';
import Search from '../../containers/Search';
import { tabs } from '../../utils/tabs';

export interface Props {
  readonly selected: number;
}

export interface Handlers {
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const TabNavigation = (props: Props & Handlers) => {
  const { onSelectTab, selected } = props;

  return (
    <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
      <Stack vertical spacing="loose">
        <Search />
      </Stack>
    </Tabs>
  );
};

export default TabNavigation;
