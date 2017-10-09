import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../types';
import { Card, Heading } from '@shopify/polaris';

import { formatAsCurrency } from '../../../utils/formatting';
import {
  earningsOnDate,
  pendingEarningsOnDate,
  hitsOnSelectedDateIds
} from '../../../selectors/hitDatabaseDay';

export interface Props {
  readonly numSubmitted: number;
  readonly earningsPending: number;
  readonly earnings: number;
}

class InfoHeader extends React.PureComponent<Props, never> {
  static showPendingEarnings = (earningsPending: number) =>
    earningsPending > 0 ? `${formatAsCurrency(earningsPending)} pending. ` : '';

  public render() {
    const { numSubmitted, earnings, earningsPending } = this.props;
    return numSubmitted > 0 ? (
      <Card.Section>
        <Heading>
          {formatAsCurrency(earnings)} earned.{' '}
          {InfoHeader.showPendingEarnings(earningsPending)} {numSubmitted} HITs
          submitted.
        </Heading>
      </Card.Section>
    ) : (
      <div />
    );
  }
}

const mapState = (state: RootState): Props => ({
  earnings: earningsOnDate(state),
  earningsPending: pendingEarningsOnDate(state),
  numSubmitted: hitsOnSelectedDateIds(state).size
});

export default connect(mapState)(InfoHeader);
