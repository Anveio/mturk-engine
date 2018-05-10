import * as React from 'react';
import { ExceptionList } from '@shopify/polaris';
import { RootState, QueueItem } from 'types';
import {
  hitDatabaseToRequesterMap,
  numSubmittedHitsToRequester,
  numRejectedHitsToRequester
} from 'selectors/hitDatabase';
import { connect } from 'react-redux';
import { generateQueueCardExceptions } from 'utils/exceptions';

interface OwnProps {
  readonly hit: QueueItem;
}

interface Props {
  readonly knownRequester: boolean;
  readonly numSubmittedHits: number;
  readonly numRejectedHits: number;
}

class QueueItemExceptionList extends React.PureComponent<
  Props & OwnProps,
  never
> {
  public render() {
    const exceptions = generateQueueCardExceptions(this.props);
    return <ExceptionList items={exceptions} />;
  }
}

const mapState = (state: RootState, { hit }: OwnProps): Props => ({
  knownRequester: hitDatabaseToRequesterMap(state).has(hit.requester.id),
  numSubmittedHits: numSubmittedHitsToRequester(hit.requester.id)(state),
  numRejectedHits: numRejectedHitsToRequester(hit.requester.id)(state)
});

export default connect(mapState)(QueueItemExceptionList);
