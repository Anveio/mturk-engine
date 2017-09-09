import * as React from 'react';
import {
  SearchResult,
  SearchResults,
  HitBlockMap,
  RequesterBlockMap,
  SortingOption
} from '../../types';
import { ResourceList, Card } from '@shopify/polaris';
import SearchCard, {
  Handlers as SearchCardHandlers
} from './SearchCard/SearchCard';
import SortingForm from '../../containers/SortingForm';
import EmptySearchTable from './EmptySearchTable';
import { sortBy } from '../../utils/sorting';

export interface Props {
  readonly hits: SearchResults;
  readonly sortingOption: SortingOption;
  readonly blockedHits: HitBlockMap;
  readonly blockedRequesters: RequesterBlockMap;
}

export interface Handlers extends SearchCardHandlers {}

class SearchTable extends React.PureComponent<Props & Handlers, never> {
  private hideBlockedHits = (hit: SearchResult) =>
    !this.props.blockedHits.get(hit.groupId);

  private hideBlockedRequesters = (hit: SearchResult) =>
    !this.props.blockedRequesters.get(hit.requester.id);

  public render() {
    const {
      hits,
      sortingOption,
      onAccept,
      onHide,
      onToggleExpand,
      onBlockRequester
    } = this.props;

    const displayedHits = this.props.hits
      .filter(this.hideBlockedRequesters)
      .filter(this.hideBlockedHits)
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
