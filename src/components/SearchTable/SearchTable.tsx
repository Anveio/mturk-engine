import * as React from 'react';
import { SearchItem, SearchMap, RequesterMap } from '../../types';
import { Stack, Card, ResourceList } from '@shopify/polaris';
import SearchCard from './SearchCard';
import SearchOptions from '../../containers/SearchOptions';
import EmptyHitTable from '../../containers/EmptySearchTable';

export interface Props {
  readonly hits: SearchMap;
  readonly requesters: RequesterMap;
}

export interface Handlers {
  readonly onAccept: (hit: SearchItem) => void;
}

// const random = (x: string) => console.log(x);

const HitTable = (props: Props & Handlers) => {
  const { hits, requesters, onAccept } = props;
  const sortedHits = (unsortedHits: SearchMap) => unsortedHits.toArray();

  return hits.isEmpty() ? (
    <Stack vertical>
      <SearchOptions />
      <EmptyHitTable />
    </Stack>
  ) : (
    <Stack vertical>
      <SearchOptions />
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
    </Stack>
  );
};

export default HitTable;
