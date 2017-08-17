import * as React from 'react';
import { Tabs } from '@shopify/polaris';
import HitTable from '../../containers/HitTable';
import Search from '../../containers/Search';
import { generateTabs } from '../../utils/tabs';

export interface Props {
  readonly selected: number;
  readonly searchSize: number;
  readonly queueSize: number;
}

export interface Handlers {
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const TabNavigation = (props: Props & Handlers) => {
  const { searchSize, queueSize, onSelectTab, selected } = props;
  const tabs = generateTabs({ searchSize, queueSize });

  return (
    <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
      <Search />
      <HitTable />
    </Tabs>
  );
};

export default TabNavigation;
