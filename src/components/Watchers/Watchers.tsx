import * as React from 'react';
import { Layout, Card } from '@shopify/polaris';
import WatcherInput from './WatcherInput';

export interface Props {}

class Watchers extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Layout>
        <Layout.AnnotatedSection
          title="Add a watcher"
          description="Enter a groupID or a pandA link."
        >
          <WatcherInput />
        </Layout.AnnotatedSection>
        <Layout.Section secondary>
          <Card sectioned title="Watcher 1">
            Hi
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned title="Watcher 1">
            Hi
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned title="Watcher 1">
            Hi
          </Card>
        </Layout.Section>
      </Layout>
    );
  }
}

export default Watchers;
