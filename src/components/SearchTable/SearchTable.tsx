import * as React from 'react';
import {
  SearchResult,
  SearchResults,
  BlockedHit,
  HitBlockMap,
  RequesterMap,
  SortingOption
} from '../../types';
import { Card, ResourceList } from '@shopify/polaris';
import SearchCard from './SearchCard';
import SortingForm from '../../containers/SortingForm';
import EmptyHitTable from '../../containers/EmptySearchTable';
import { sortBy } from '../../utils/sorting';

export interface Props {
  readonly hits: SearchResults;
  readonly requesters: RequesterMap;
  readonly sortingOption: SortingOption;
  readonly blockedHits: HitBlockMap;
}

export interface Handlers {
  readonly onAccept: (hit: SearchResult) => void;
  readonly onHide: (hit: BlockedHit) => void;
}

const HitTable = (props: Props & Handlers) => {
  const {
    hits,
    requesters,
    blockedHits,
    sortingOption,
    onAccept,
    onHide
  } = props;

  const filterBlockedHits = (unfilteredHits: SearchResults) =>
    unfilteredHits.filter(
      (hit: SearchResult) => !blockedHits.get(hit.groupId)
    ) as SearchResults;

  const displayedHits = filterBlockedHits(hits)
    .sort(sortBy(sortingOption))
    .toArray();

  return hits.isEmpty() ? (
    <EmptyHitTable />
  ) : (
    <Card
      title={`${hits.size} results. ${hits.size -
        displayedHits.length} hidden.`}
    >
      <SortingForm />
      <ResourceList
        items={displayedHits}
        renderItem={(hit: SearchResult) => (
          <SearchCard
            hit={hit}
            requester={requesters.get(hit.requesterId)}
            onAccept={onAccept}
            onHide={onHide}
          />
        )}
      />
    </Card>
  );
};

export default HitTable;
