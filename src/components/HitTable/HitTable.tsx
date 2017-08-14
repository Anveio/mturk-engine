import * as React from 'react';
import { Hit, HitMap, RequesterMap } from '../../types';
import { Card, ResourceList } from '@shopify/polaris';
// import HitCard from './HitCard';
import HitItem from './HitItem';
import EmptyHitTable from './EmptyHitTable';

import { sortByTime } from '../../utils/sorting';

export interface Props {
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
  readonly emptyAction: () => void;
}

const HitTable = ({ hits, requesters, emptyAction }: Props) => {
  const sortedHits = (unsortedHits: HitMap) =>
    unsortedHits.sort(sortByTime).toArray().slice(0, 50);

  return hits.isEmpty() ? (
    <EmptyHitTable onAction={emptyAction} />
  ) : (
    <Card>
      <ResourceList
        items={sortedHits(hits)}
        renderItem={(hit: Hit) => (
          <HitItem hit={hit} requester={requesters.get(hit.requesterId)} />
        )}
      />
    </Card>
  );
};

export default HitTable;
