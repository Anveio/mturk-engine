import * as React from 'react';
import { Hit, HitMap, RequesterMap } from '../../types';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';
import { sortByTime } from '../../utils/sorting';

export interface Props {
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
}

const HitTable = ({ hits, requesters }: Props) => {
  const sortedHits = (unsortedHits: HitMap) =>
    unsortedHits.toArray().sort(sortByTime).slice(0, 50);

  return (
    <ResourceList
      items={sortedHits(hits)}
      renderItem={(hit: Hit) => (
        <HitCard
          hit={hit}
          requester={requesters.get(hit.requesterId)}
          key={hit.groupId}
        />
      )}
    />
  );
};

export default HitTable;
