import * as React from 'react';
import { Badge } from '@shopify/polaris';
import { RootState, RequesterId } from 'types';
import { requestersToWeightedToMap } from 'selectors/turkopticon';
import { connect } from 'react-redux';
import { assignScoreColor } from 'utils/badges';

interface OwnProps {
  readonly requesterId: RequesterId;
}

interface Props {
  readonly weightedToScore: number | null;
}

class TOpticonBadge extends React.PureComponent<Props, never> {
  public render() {
    const { weightedToScore } = this.props;
    return weightedToScore ? (
      <Badge status={assignScoreColor(weightedToScore)}>
        {`${weightedToScore.toFixed(2)} T.O.`}
      </Badge>
    ) : (
      <Badge>No T.O.</Badge>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  weightedToScore: requestersToWeightedToMap(state).get(ownProps.requesterId)
});

export default connect(mapState)(TOpticonBadge);
