import * as React from 'react';
import { Tabs } from '@shopify/polaris';
import SelectedHitDate from '../SelectedHitDate/SelectedHitDate';
import DatabaseFilter from '../DatabaseFilter/DatabaseFilter';

interface State {
  readonly selectedTabIndex: number;
}

interface TabLookup {
  [key: number]: JSX.Element;
}

class DatabaseTabNavigation extends React.PureComponent<{}, State> {
  public readonly state: State = { selectedTabIndex: 0 };

  private static renderSelectedTab: TabLookup = {
    0: <SelectedHitDate />,
    1: <DatabaseFilter />
  };

  private handleTabSelect = (newTabIndex: number) =>
    this.setState({ selectedTabIndex: newTabIndex });

  public render() {
    return (
      <Tabs
        tabs={[
          { id: 'date-information', content: 'Date' },
          { id: 'search-database', content: 'Search' }
        ]}
        selected={this.state.selectedTabIndex}
        onSelect={this.handleTabSelect}
      >
        {DatabaseTabNavigation.renderSelectedTab[this.state.selectedTabIndex]}
      </Tabs>
    );
  }
}

export default DatabaseTabNavigation;
