import * as React from 'react';
import {
  SearchResult,
  SearchResults,
  HitBlockMap,
  RequesterMap,
  SortingOption
} from '../../types';
import { ResourceList, Card } from '@shopify/polaris';
import SearchCard, {
  Handlers as SearchCardHandlers
} from './SearchCard/SearchCard';
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
  private rejectBlockedHits = (hit: SearchResult) =>
    !this.props.blockedHits.get(hit.groupId);

  public render() {
    const {
      hits,
      sortingOption,
      requesters,
      onAccept,
      onHide,
      onToggleExpand,
      onBlockRequester
    } = this.props;

    const displayedHits = this.props.hits
      .filter(this.rejectBlockedHits)
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
        <ResourceList
          items={displayedHits.toArray()}
          renderItem={(hit: SearchResult) => {
            return (
              <SearchCard
                key={hit.groupId}
                hit={hit}
                requester={requesters.get(hit.requesterId)}
                onAccept={onAccept}
                onHide={onHide}
                onToggleExpand={onToggleExpand}
                onBlockRequester={onBlockRequester}
              />
            );
          }}
        />
      </Card>
    );
  }
}

export default SearchTable;
