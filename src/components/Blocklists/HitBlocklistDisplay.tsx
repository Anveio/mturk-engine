import { ResourceList } from '@shopify/polaris';
import { List } from 'immutable';
import * as React from 'react';
import { BlockedHit } from '../../types';
import BlockedHitCard from './BlockedHitCard';
import HitBlockListFilterControl from './HitBlockListFilterControl';

interface Props {
  readonly hits: List<BlockedHit>;
}

class HitBlocklistDisplay extends React.Component<Props, never> {
  shouldComponentUpdate(nextProps: Props) {
    return !nextProps.hits.equals(this.props.hits);
  }

  public render() {
    const itemsToShow = this.props.hits.toArray();

    return (
      <ResourceList
        showHeader
        filterControl={<HitBlockListFilterControl />}
        resourceName={{ singular: 'Blocked HIT', plural: 'Blocked HITs' }}
        items={itemsToShow}
        renderItem={({ groupId }: BlockedHit) => (
          <BlockedHitCard blockedHitId={groupId} />
        )}
      />
    );
  }
}

export default HitBlocklistDisplay;
