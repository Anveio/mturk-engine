import * as React from 'react';
import { Layout } from '@shopify/polaris';
import WatcherInput from './WatcherInput';
import WatcherCard from './WatcherCard';

export interface Props {
  readonly watcherIds: string[];
}

class Watchers extends React.PureComponent<Props, never> {
  static generateColumn = (number: number) => (
    watcherIds: string[]
  ): JSX.Element[] => {
    if (watcherIds.length === 0) {
      return [];
    }

    let column: JSX.Element[] = [];

    for (let i = number; i < watcherIds.length; i += 3) {
      const id = watcherIds[i];
      column.push(<WatcherCard watcher={id} key={id} />);
    }

    return column;
  };

  public render() {
    const { watcherIds } = this.props;

    return (
      <Layout>
        <Layout.AnnotatedSection
          title="Add a watcher"
          description="Enter a groupID or a pandA link."
        >
          <WatcherInput />
        </Layout.AnnotatedSection>
        <Layout.Section secondary>
          {Watchers.generateColumn(0)(watcherIds)}
        </Layout.Section>
        <Layout.Section secondary>
          {Watchers.generateColumn(1)(watcherIds)}
        </Layout.Section>
        <Layout.Section secondary>
          {Watchers.generateColumn(2)(watcherIds)}
        </Layout.Section>
      </Layout>
    );
  }
}

export default Watchers;
