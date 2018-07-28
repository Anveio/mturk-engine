import { Card } from '@shopify/polaris';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, HitBlockMap } from 'types';
import HitBlocklistDisplay from './HitBlocklistDisplay';
import HitBlocklistHeading from './HitBlocklistHeading';

interface Props {
  readonly blockedHits: HitBlockMap;
}

class RecentlyBlockedHits extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !nextProps.blockedHits.equals(this.props.blockedHits);
  }

  public render() {
    return (
      <Card>
        <Card.Section>
          <HitBlocklistHeading />
        </Card.Section>
        <HitBlocklistDisplay hits={this.props.blockedHits.toList()} />
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  blockedHits: state.recentlyBlockedHits
});

export default connect(mapState)(RecentlyBlockedHits);
