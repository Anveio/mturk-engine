import * as React from 'react';
import { SearchItem, SearchMap, RequesterMap, SearchOptions } from '../../types';
import { Card, ResourceList } from '@shopify/polaris';
import SearchCard from './SearchCard';
import EmptyHitTable from './EmptySearchTable';

export interface Props {
  readonly hits: SearchMap;
  readonly requesters: RequesterMap;
  readonly options: SearchOptions;
}

export interface Handlers {
  readonly onFetch: (options: SearchOptions) => void;
  readonly onAccept: (groupId: string) => void;
}

// const random = (x: string) => console.log(x);

const HitTable = (props: Props & Handlers) => {
  const { hits, requesters, options, onFetch, onAccept } = props;
  const sortedHits = (unsortedHits: SearchMap) => unsortedHits.toArray();

  return hits.isEmpty() ? (
    <EmptyHitTable onFetch={onFetch} options={options} />
  ) : (
    <Card>
      <ResourceList
        items={sortedHits(hits)}
        renderItem={(hit: SearchItem) => (
          <SearchCard
            hit={hit}
            requester={requesters.get(hit.requesterId)}
            onClick={onAccept}
          />
        )}
      />
    </Card>
  );
};

export default HitTable;
