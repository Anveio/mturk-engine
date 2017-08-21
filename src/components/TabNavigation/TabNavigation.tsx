import * as React from 'react';
import { Tabs, Layout } from '@shopify/polaris';
import SearchTable from '../../containers/SearchTable';
import QueueTable from '../../containers/QueueTable';
// import SearchContainer from '../../containers/SearchContainer';
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
      return <SearchTable />;
    },
    1: () => {
      return <QueueTable />;
    }
  };

  return (
    <Layout.Section>
      <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
        {displaySelectedTab[selected]()}
      </Tabs>
    </Layout.Section>
  );
};

export default TabNavigation;
