import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../types';
import { Card, Stack, Heading } from '@shopify/polaris';

import { formatAsCurrency } from '../../../utils/formatting';
import {
  earningsOnDate,
  pendingEarningsOnDate,
  hitsOnSelectedDateIds
} from '../../../selectors/hitDatabaseDay';
import CompletedHitListPagination, {
  Handlers as PaginationHandlers,
  Props as PaginationProps
} from './CompletedHitListPagination';

export interface Props {
  readonly numSubmitted: number;
  readonly earningsPending: number;
  readonly earnings: number;
}

class InfoHeader extends React.PureComponent<
  Props & PaginationHandlers & PaginationProps,
  never
> {
  static showPendingEarnings = (earningsPending: number) =>
    earningsPending > 0 ? `${formatAsCurrency(earningsPending)} pending. ` : '';

  public render() {
    const { numSubmitted, earnings, earningsPending } = this.props;

    return numSubmitted > 0 ? (
      <Card.Section>
        <Stack vertical={false} spacing="tight" alignment="baseline">
          <CompletedHitListPagination {...this.props} />
          <Heading>
            {formatAsCurrency(earnings)} earned.{' '}
            {InfoHeader.showPendingEarnings(earningsPending)} {numSubmitted}{' '}
            HITs submitted.
          </Heading>
        </Stack>
      </Card.Section>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  earnings: earningsOnDate(state),
  earningsPending: pendingEarningsOnDate(state),
  numSubmitted: hitsOnSelectedDateIds(state).size
});

export default connect(mapState)(InfoHeader);
