import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Card, ResourceList } from '@shopify/polaris';
import BlockedHitCard from './BlockedHitCard';
import { recentlyBlockedHitIds } from '../../selectors/hitBlocklist';

export interface Props {
  readonly blockedHitIds: string[];
}

class HitBlockList extends React.PureComponent<Props, never> {
  public render() {
    return this.props.blockedHitIds.length === 0 ? (
      <div />
    ) : (
      <Card title="Recently blocked HITs">
        <ResourceList
          items={this.props.blockedHitIds}
          renderItem={(id: string) => (
            <BlockedHitCard key={id} blockedHitId={id} />
          )}
        />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  blockedHitIds: recentlyBlockedHitIds(state)
});

export default connect(mapState)(HitBlockList);
