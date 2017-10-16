import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Tabs2 as Tabs, Tab2 as Tab } from '@blueprintjs/core';
import { RootState } from '../../types';
import { changeTab, ChangeTab } from '../../actions/updateValue';
import QueueTable from '../../containers/QueueTable';
import SearchTab from './SearchTab';
import Account from '../Account/Account';
import BlockLists from '../BlockList/BlockLists';
import SettingsTab from './SettingsTab';
import Watchers from '../../containers/Watchers';

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
      id="mturk-engine-tab-navigation"
      selectedTabId={selected}
      onChange={onSelectTab}
      animate={false}
      renderActiveTabPanelOnly
    >
      <Tab id={0} title="Search" panel={<SearchTab />} />
      <Tab id={1} title={`Queue (${queueSize})`} panel={<QueueTable />} />
      <Tab id={2} title="Watchers" panel={<Watchers />} />
      <Tab id={3} title="Blocklist" panel={<BlockLists />} />
      <Tab id={4} title="Account" panel={<Account />} />
      <Tab id={5} title="Settings" panel={<SettingsTab />} />
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
