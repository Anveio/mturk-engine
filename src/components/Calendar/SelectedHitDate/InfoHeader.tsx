import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, DailyEarnings } from '../../../types';
import { Card, Stack, Heading } from '@shopify/polaris';
import { formatAsCurrency } from '../../../utils/formatting';
import {
  earningsOnDate,
  pendingEarningsOnDate,
  hitsOnSelectedDateIds
} from '../../../selectors/hitDatabaseDay';
import PaginationButtons, {
  Handlers as PaginationHandlers,
  Props as PaginationProps
} from './PaginationButtons';

export interface Props {
  readonly numSubmitted: number;
  readonly earningsPending: number;
  readonly dailyEarnings: DailyEarnings;
}

class InfoHeader extends React.PureComponent<
  Props & PaginationHandlers & PaginationProps,
  never
> {
  static showPendingEarnings = (earningsPending: number) =>
    earningsPending > 0 ? `${formatAsCurrency(earningsPending)} pending. ` : '';

  public render() {
    const {
      dailyEarnings: { reward, bonus },
      numSubmitted,
      earningsPending
    } = this.props;

    return numSubmitted > 0 ? (
      <Card.Section>
        <Stack vertical={false} spacing="tight" alignment="baseline">
          <PaginationButtons {...this.props} />
          <Heading>
            {formatAsCurrency(reward + bonus)} earned.{' '}
            {InfoHeader.showPendingEarnings(earningsPending)} {numSubmitted}{' '}
            HITs submitted.
          </Heading>
        </Stack>
      </Card.Section>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  dailyEarnings: earningsOnDate(state),
  earningsPending: pendingEarningsOnDate(state),
  numSubmitted: hitsOnSelectedDateIds(state).size
});

export default connect(mapState)(InfoHeader);
