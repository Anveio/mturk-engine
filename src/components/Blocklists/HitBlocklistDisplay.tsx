import { ResourceList } from '@shopify/polaris';
import { List } from 'immutable';
import * as React from 'react';
import { BlockedHit } from '../../types';
import BlockedHitCard from './BlockedHitCard';
import { DATABASE_FILTER_RESULTS_PER_PAGE } from 'constants/misc';
import HitBlockListFilterControl from './HitBlockListFilterControl';

interface Props {
  readonly page: number;
  readonly blockedHits: List<BlockedHit>;
}

class HitBlocklistDisplay extends React.Component<Props, never> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.page !== this.props.page ||
      !nextProps.blockedHits.equals(this.props.blockedHits)
    );
  }

  public render() {
    const { blockedHits, page } = this.props;
    const start = DATABASE_FILTER_RESULTS_PER_PAGE * page;
    const end = start + DATABASE_FILTER_RESULTS_PER_PAGE;
    const itemsToShow = blockedHits.slice(start, end).toArray();
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
