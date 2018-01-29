import * as React from 'react';
import { connect } from 'react-redux';
import { List as ImmutableList } from 'immutable';
import { RootState, HitDatabaseEntry, Requester } from '../../types';
import { Card } from '@shopify/polaris';
import {
  allHitsSubmittedToRequesterRecentFirst,
  hitDatabaseToRequesterMap
} from '../../selectors/hitDatabase';
import { pluralize } from '../../utils/formatting';
import SubmittedHitsCaptionedList from './SubmittedHitsCaptionedList';

interface OwnProps {
  readonly requesterId: string;
}

interface Props {
  readonly requester: Requester;
  readonly hits: ImmutableList<HitDatabaseEntry>;
}

class RequesterWorkHistory extends React.PureComponent<
  Props & OwnProps,
  never
> {
  public render() {
    const { hits, requester } = this.props;
    return (
      <Card
        sectioned
        title={`Found ${hits.size} ${pluralize(
          'HIT',
          'HITS',
          hits.size
        )} submitted to ${requester.name}`}
      >
        <SubmittedHitsCaptionedList numbered hits={hits} />
      </Card>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  requester: hitDatabaseToRequesterMap(state).get(ownProps.requesterId),
  hits: allHitsSubmittedToRequesterRecentFirst(ownProps.requesterId)(state)
});

export default connect(mapState)(RequesterWorkHistory);
