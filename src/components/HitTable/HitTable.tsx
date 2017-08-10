import * as React from 'react';
import { Hit, HitMap, RequesterMap } from '../../types';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';

export interface Props {
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
}

const HitTable = ({ hits, requesters }: Props) => {
  return (
    <ResourceList
      items={hits.toArray()}
      renderItem={(hit: Hit) => (
        <HitCard hit={hit} requester={requesters.get(hit.requesterId)} />
      )}
    />
  );
};

export default HitTable;
