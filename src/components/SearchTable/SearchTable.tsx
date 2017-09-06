import * as React from 'react';
import {
  SearchResult,
  SearchResults,
  HitBlockMap,
  RequesterMap,
  SortingOption
} from '../../types';
import { Card } from '@shopify/polaris';
import SearchCard, { Handlers as SearchCardHandlers } from './SearchCard';
import SortingForm from '../../containers/SortingForm';
import EmptySearchTable from '../../containers/EmptySearchTable';
import { sortBy } from '../../utils/sorting';

export interface Props {
  readonly hits: SearchResults;
  readonly requesters: RequesterMap;
  readonly sortingOption: SortingOption;
  readonly blockedHits: HitBlockMap;
}

export interface Handlers extends SearchCardHandlers {}

class SearchTable extends React.PureComponent<Props & Handlers, never> {
  private filterBlockedHits = (unfilteredHits: SearchResults) =>
    unfilteredHits.filter(
      (hit: SearchResult) => !this.props.blockedHits.get(hit.groupId)
    );

  public render() {
    const {
      hits,
      sortingOption,
      requesters,
      onAccept,
      onHide,
      onToggleExpand
    } = this.props;

    const displayedHits = this.filterBlockedHits(hits)
      .toList()
      .sort(sortBy(sortingOption));

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
              onToggleExpand={onToggleExpand}
            />
          );
        })}
      </Card>
    );
  }
}

export default SearchTable;
