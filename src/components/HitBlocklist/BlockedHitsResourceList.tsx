import { ResourceList } from '@shopify/polaris';
import { List } from 'immutable';
import * as React from 'react';
import { BlockedHit } from '../../types';
import BlockedHitCard from './BlockedHitCard';
import HitBlockListFilterControl from './HitBlockListFilterControl';

interface Props {
  readonly startIndex: number;
  readonly endIndex: number;
  readonly hits: List<BlockedHit>;
}

class BlockedHitsResourceList extends React.Component<Props, never> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      !nextProps.hits.equals(this.props.hits) ||
      !(nextProps.endIndex === this.props.endIndex) ||
      !(nextProps.startIndex === this.props.startIndex)
    );
  }

  public render() {
    const { startIndex, endIndex, hits } = this.props;
    const itemsToShow = hits.slice(startIndex, endIndex).toArray();
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

export default BlockedHitsResourceList;
