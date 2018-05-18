import * as React from 'react';
import { ExceptionList } from '@shopify/polaris';
import { RootState, SearchResult } from 'types';
import {
  hitDatabaseToRequesterMap,
  numSubmittedHitsToRequester,
  numRejectedHitsToRequester
} from 'selectors/hitDatabase';
import { uniqueGroupIdsInQueueHistogram } from 'selectors/queue';
import { connect } from 'react-redux';
import { generateSearchCardExceptions } from 'utils/exceptions';

interface OwnProps {
  readonly hit: SearchResult;
}

interface Props {
  readonly knownRequester: boolean;
  readonly numSubmittedHits: number;
  readonly numRejectedHits: number;
  readonly hitsInQueue: number;
}

class SearchResultExceptionList extends React.PureComponent<
  Props & OwnProps,
  never
> {
  public render() {
    const exceptions = generateSearchCardExceptions(
      this.props.hit,
      this.props,
      this.props.hitsInQueue
    );
    return <ExceptionList items={exceptions} />;
  }
}

const mapState = (state: RootState, { hit }: OwnProps): Props => ({
  knownRequester: hitDatabaseToRequesterMap(state).has(hit.requester.id),
  hitsInQueue: uniqueGroupIdsInQueueHistogram(state).get(hit.groupId) || 0,
  numSubmittedHits: numSubmittedHitsToRequester(hit.requester.id)(state),
  numRejectedHits: numRejectedHitsToRequester(hit.requester.id)(state)
});

export default connect(mapState)(SearchResultExceptionList);
