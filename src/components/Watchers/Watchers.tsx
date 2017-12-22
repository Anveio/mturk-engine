import * as React from 'react';
import { Layout } from '@shopify/polaris';
import { RootState } from '../../types';
import { connect } from 'react-redux';
import WatcherInput from './WatcherInput';
import WatcherCard from './WatcherCard';
import EmptyWatchers from './EmptyWatchers';
import { List } from 'immutable';
import { watcherIdsList } from '../../selectors/watchers';

export interface Props {
  readonly watcherIds: List<string>;
}

class Watchers extends React.PureComponent<Props, never> {
  private static generateColumn = (offset: number) => (
    ids: List<string>
  ): JSX.Element[] => {
    if (ids.size === 0) {
      return [];
    }

    let column: JSX.Element[] = [];

    for (let i = offset; i < ids.size; i += 3) {
      const id = ids.get(i);
      column.push(<WatcherCard watcherId={id} key={id} />);
    }

    return column;
  };

  private static WatcherLayout: React.SFC = ({ children }) => (
    <Layout>
      <Layout.AnnotatedSection
        title="Add a watcher"
        description="Enter a project ID, or 'Preview & Work' link."
      >
        <WatcherInput />
      </Layout.AnnotatedSection>
      {children}
    </Layout>
  );

  public render() {
    const { watcherIds } = this.props;

    return watcherIds.isEmpty() ? (
      <Watchers.WatcherLayout>
        <Layout.Section>
          <EmptyWatchers />
        </Layout.Section>
      </Watchers.WatcherLayout>
    ) : (
      <Watchers.WatcherLayout>
        <Layout.Section secondary>
          {Watchers.generateColumn(0)(watcherIds)}
        </Layout.Section>
        <Layout.Section secondary>
          {Watchers.generateColumn(1)(watcherIds)}
        </Layout.Section>
        <Layout.Section secondary>
          {Watchers.generateColumn(2)(watcherIds)}
        </Layout.Section>
      </Watchers.WatcherLayout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  watcherIds: watcherIdsList(state)
});

export default connect(mapState)(Watchers);
