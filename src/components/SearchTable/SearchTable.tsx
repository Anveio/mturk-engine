import * as React from 'react';
import {
  SearchResult,
  SearchResults,
  BlockedHit,
  HitBlockMap,
  RequesterMap,
  SortingOption
} from '../../types';
import { Card } from '@shopify/polaris';
import SearchCard from './SearchCard';
import SortingForm from '../../containers/SortingForm';
import EmptySearchTable from '../../containers/EmptySearchTable';
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

class SearchTable extends React.PureComponent<Props & Handlers, never> {
  public render() {
    const {
      blockedHits,
      hits,
      sortingOption,
      requesters,
      onAccept,
      onHide
    } = this.props;

    const filterBlockedHits = (unfilteredHits: SearchResults) =>
      unfilteredHits.filter(
        (hit: SearchResult) => !blockedHits.get(hit.groupId)
      ) as SearchResults;

    const displayedHits = filterBlockedHits(hits)
      .sort(sortBy(sortingOption))
      .toList();

    return hits.isEmpty() ? (
      <EmptySearchTable />
    ) : (
      <Card
        title={`${hits.size} results. ${hits.size -
          displayedHits.size} hidden.`}
      >
        <SortingForm />
        {displayedHits.map((hit: SearchResult) => {
          return (
            <SearchCard
              key={hit.groupId}
              hit={hit}
              requester={requesters.get(hit.requesterId)}
              onAccept={onAccept}
              onHide={onHide}
            />
          );
        })}
      </Card>
    );
  }
}

export default SearchTable;
