import * as React from 'react';
import { Tabs, Stack } from '@shopify/polaris';
import SearchTable from '../../containers/SearchTable';
import QueueTable from '../../containers/QueueTable';
// import Search from '../../containers/Search';
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

  const displaySelectedTab = {
    0: () => {
      return (
        <Stack vertical>
          {/* <Search /> */}
          <SearchTable />
        </Stack>
      );
    },
    1: () => {
      return <QueueTable />;
    }
  };

  return (
    <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
      {displaySelectedTab[selected]()}
    </Tabs>
  );
};

export default TabNavigation;
