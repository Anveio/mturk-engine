import * as React from 'react';
import { Layout } from '@shopify/polaris';
import WatcherInput from './WatcherInput';
import WatcherCard from './WatcherCard';

export interface Props {
  readonly watcherIds: string[];
}

class Watchers extends React.PureComponent<Props, never> {
  private generateColumn = (number: number): JSX.Element[] => {
    if (this.props.watcherIds.length === 0) {
      return [];
    }

    let column: JSX.Element[] = [];

    for (let i = number; i < this.props.watcherIds.length; i += 3) {
      const id = this.props.watcherIds[i];
      column.push(<WatcherCard watcher={id} key={id} />);
    }

    return column;
  };

  public render() {
    return (
      <Layout>
        <Layout.AnnotatedSection
          title="Add a watcher"
          description="Enter a groupID or a pandA link."
        >
          <WatcherInput />
        </Layout.AnnotatedSection>
        <Layout.Section secondary>{this.generateColumn(0)}</Layout.Section>
        <Layout.Section secondary>{this.generateColumn(1)}</Layout.Section>
        <Layout.Section secondary>{this.generateColumn(2)}</Layout.Section>
      </Layout>
    );
  }
}

export default Watchers;
