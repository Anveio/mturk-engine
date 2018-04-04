import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Card, ResourceList } from '@shopify/polaris';
import BlockedHitCard from './BlockedHitCard';
import { recentlyBlockedHitIds } from '../../selectors/hitBlocklist';

interface Props {
  readonly blockedHitIds: string[];
  readonly blocklistSize: number;
}

class HitBlockList extends React.PureComponent<Props, never> {
  public render() {
    const { blockedHitIds, blocklistSize } = this.props;
    return blockedHitIds.length === 0 ? null : (
      <Card title={`Recently blocked HITs (${blocklistSize} total)`}>
        <ResourceList
          items={blockedHitIds}
          renderItem={(id: string) => (
            <BlockedHitCard key={id} blockedHitId={id} />
          )}
        />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  blockedHitIds: recentlyBlockedHitIds(state),
  blocklistSize: state.hitBlocklist.size
});

export default connect(mapState)(HitBlockList);
