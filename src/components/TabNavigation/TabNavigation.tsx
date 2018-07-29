import * as React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from '@blueprintjs/core';
import { RootState } from '../../types';
import { changeTab } from '../../actions/updateValue';
import SearchTab from './SearchTab';
import QueueTab from './QueueTab';
import Watchers from '../WatcherTree/DoubleClickHandler';
import Account from '../Account/Account';
import SettingsTab from './SettingsTab';
import { TabIndex } from 'constants/enums';
import BlocklistsTab from './BlocklistsTab';

interface Props {
  readonly selected: number;
  readonly queueSize: number;
  readonly numActiveWatchers: number;
}

interface Handlers {
  readonly onSelectTab: (selectedTabIndex: number) => void;
}

const TabNavigation: React.SFC<Props & Handlers> = ({
  numActiveWatchers,
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
        panel={<QueueTab />}
      />
      <Tab
        id={TabIndex.WATCHERS}
        title={`Watchers (${numActiveWatchers})`}
        panel={<Watchers />}
      />
      <Tab
        id={TabIndex.BLOCKLIST}
        title="Blocklist"
        panel={<BlocklistsTab />}
      />
      <Tab id={TabIndex.ACCOUNT} title="Account" panel={<Account />} />
      <Tab id={TabIndex.SETTINGS} title="Settings" panel={<SettingsTab />} />
    </Tabs>
  );
};

const mapState = (state: RootState): Props => ({
  selected: state.tab,
  queueSize: state.queue.size,
  numActiveWatchers: state.watcherTimers.size
});

const mapDispatch: Handlers = {
  onSelectTab: changeTab
};

export default connect(
  mapState,
  mapDispatch
)(TabNavigation);
