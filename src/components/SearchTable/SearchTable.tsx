import * as React from 'react';
import { SearchItem, SearchMap, RequesterMap, SortingOption } from '../../types';
import { Stack, Card, ResourceList } from '@shopify/polaris';
import SearchCard from './SearchCard';
import SortingForm from './SortingOptions/SortingForm';
import SearchBar from '../../containers/SearchBar';
import EmptyHitTable from '../../containers/EmptySearchTable';
import { sortBy } from '../../utils/sorting';

export interface Props {
  readonly hits: SearchMap;
  readonly requesters: RequesterMap;
  readonly sortingOption: SortingOption;
}

export interface Handlers {
  readonly onAccept: (hit: SearchItem) => void;
  readonly onChangeSort: (option: SortingOption) => void;
}

// const random = (x: string) => console.log(x);

const HitTable = (props: Props & Handlers) => {
  const { hits, requesters, sortingOption, onAccept, onChangeSort } = props;
  const sortedHits = (unsortedHits: SearchMap) =>
    unsortedHits.sort(sortBy(sortingOption)).toArray();

  return hits.isEmpty() ? (
    <Stack vertical>
      <SearchBar />
      <EmptyHitTable />
    </Stack>
  ) : (
    <Stack vertical>
      <SearchBar />
      <Card>
        <SortingForm onChange={onChangeSort} value={sortingOption} />
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
