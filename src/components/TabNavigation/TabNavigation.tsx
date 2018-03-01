import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Tabs2 as Tabs, Tab2 as Tab } from '@blueprintjs/core';
import { RootState } from '../../types';
import { changeTab, ChangeTab } from '../../actions/updateValue';
import { TabIndex } from '../../constants/tabs';
import QueueTable from '../Queue/QueueTable';
import SearchTab from './SearchTab';
import Account from '../Account/Account';
import BlockLists from '../BlockList/BlockLists';
import SettingsTab from './SettingsTab';
import Watchers from '../WatcherTree/DoubleClickHandler';

export interface Props {
  readonly selected: number;
  readonly queueSize: number;
}

export interface Handlers {
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const TabNavigation: React.SFC<Props & Handlers> = ({
  onSelectTab,
  queueSize,
  selected
}) => {
  return (
    <Tabs
      id="tab-navigation"
      selectedTabId={selected}
      onChange={onSelectTab}
      animate={false}
    >
      <Tab id={TabIndex.SEARCH} title="Search" panel={<SearchTab />} />
      <Tab
        id={TabIndex.QUEUE}
        title={`Queue (${queueSize})`}
        panel={<QueueTable />}
      />
      <Tab id={TabIndex.WATCHERS} title="Watchers" panel={<Watchers />} />
      <Tab id={TabIndex.BLOCKLIST} title="Blocklist" panel={<BlockLists />} />
      <Tab id={TabIndex.ACCOUNT} title="Account" panel={<Account />} />
      <Tab id={TabIndex.SETTINGS} title="Settings" panel={<SettingsTab />} />
    </Tabs>
  );
};

const mapState = (state: RootState): Props => ({
  selected: state.tab,
  queueSize: state.queue.size
});

const mapDispatch = (dispatch: Dispatch<ChangeTab>): Handlers => ({
  onSelectTab: (selectedTabIndex: number) => {
    dispatch(changeTab(selectedTabIndex));
  }
});

export default connect(mapState, mapDispatch)(TabNavigation);
