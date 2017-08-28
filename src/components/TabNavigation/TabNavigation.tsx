import * as React from 'react';
import { Tabs} from '@shopify/polaris';
import SearchTable from '../../containers/SearchTable';
import QueueTable from '../../containers/QueueTable';
import BlockList from '../../containers/BlockList';
import { generateTabs } from '../../utils/tabs';

export interface Props {
  readonly selected: number;
  readonly queueSize: number;
}

export interface Handlers {
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const TabNavigation = (props: Props & Handlers) => {
  const { queueSize, onSelectTab, selected } = props;
  const tabs = generateTabs({ queueSize });

  const displaySelectedTab = {
    0: () => {
      return <SearchTable />;
    },
    1: () => {
      return <QueueTable />;
    },
    2: () => {
      return <BlockList />;
    }
  };

  return (
      <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
        {displaySelectedTab[selected]()}
      </Tabs>
  );
};

export default TabNavigation;
