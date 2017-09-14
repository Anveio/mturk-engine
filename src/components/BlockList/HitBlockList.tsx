import * as React from 'react';
import { Layout, Card, ResourceList } from '@shopify/polaris';
import BlockedHitCard from '../../containers/BlockedHitCard';

export interface Props {
  readonly blockedHitIds: string[];
}

class HitBlockList extends React.PureComponent<Props, never> {
  public render() {
    return this.props.blockedHitIds.length === 0 ? (
      <div />
    ) : (
      <Layout.Section>
        <Card title="Recently blocked HITs">
          <ResourceList
            items={this.props.blockedHitIds}
            renderItem={(id: string) => (
              <BlockedHitCard key={id} blockedHitId={id} />
            )}
          />
        </Card>
      </Layout.Section>
    );
  }
}

export default HitBlockList;
