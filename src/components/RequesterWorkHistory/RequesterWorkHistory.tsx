import * as React from 'react';
import { connect } from 'react-redux';
import { List as ImmutableList } from 'immutable';
import { RootState, HitDatabaseEntry, Requester } from '../../types';
import { Card, List, Caption } from '@shopify/polaris';
import { stringToDate } from '../../utils/dates';
import { LEGACY_DATE_FORMAT } from '../../constants/misc';
import {
  allHitsSubmittedToRequesterRecentFirst,
  hitDatabaseToRequesterMap
} from '../../selectors/hitDatabase';
import { formatAsCurrency, pluralize } from '../../utils/formatting';

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
        <List>
          {hits.slice(0, 5).map((hit: HitDatabaseEntry) => (
            <List.Item key={hit.id}>
              {hit.title}
              <Caption>{`${formatAsCurrency(
                hit.reward
              )} - Submitted ${stringToDate(hit.date)(
                LEGACY_DATE_FORMAT
              ).toLocaleDateString()}`}</Caption>
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  requester: hitDatabaseToRequesterMap(state).get(ownProps.requesterId),
  hits: allHitsSubmittedToRequesterRecentFirst(ownProps.requesterId)(state)
});

export default connect(mapState)(RequesterWorkHistory);
