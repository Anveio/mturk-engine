import * as React from 'react';
import { Tabs } from '@shopify/polaris';
import QueueTable from '../../containers/QueueTable';
import SearchTab from './SearchTab';
import AccountTab from './AccountTab';
import BlockLists from '../BlockList/BlockLists';
import { generateTabs } from '../../utils/tabs';
import SettingsTab from './SettingsTab';
import Watchers from '../../containers/Watchers';

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
      return <SearchTab />;
    },
    1: () => {
      return <QueueTable />;
    },
    2: () => {
      return <Watchers />;
    },
    3: () => {
      return <BlockLists />;
    },
    4: () => {
      return <AccountTab />;
    },
    5: () => {
      return <SettingsTab />;
    }
  };

  return (
    <Tabs selected={selected} tabs={tabs} onSelect={onSelectTab}>
      {displaySelectedTab[selected]()}
    </Tabs>
  );
};

export default TabNavigation;
