import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Card, Heading } from '@shopify/polaris';
import { formatAsCurrency } from '../../utils/formatting';
import {
  earningsOnDate,
  pendingEarningsOnDate
} from '../../selectors/hitDatabaseDay';

export interface Props {
  readonly numSubmitted: number;
  readonly numAccepted: number;
  readonly earningsPending: number;
  readonly earnings: number;
}

class ActionBar extends React.PureComponent<Props, never> {
  static showPendingEarnings = (earningsPending: number) =>
    earningsPending > 0 ? `${formatAsCurrency(earningsPending)} pending. ` : '';

  public render() {
    const { earnings, earningsPending } = this.props;
    return (
      <Card.Section>
        <Heading>
          {formatAsCurrency(earnings)} earned.{' '}
          {ActionBar.showPendingEarnings(earningsPending)}
        </Heading>
      </Card.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  earnings: earningsOnDate(state),
  earningsPending: pendingEarningsOnDate(state),
  numAccepted: 0,
  numSubmitted: 0
});

export default connect(mapState)(ActionBar);
