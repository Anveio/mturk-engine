import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, DailyEarnings } from 'types';
import { Card, Stack, Heading } from '@shopify/polaris';
import { formatAsCurrency } from 'utils/formatting';
import {
  earningsOnDate,
  pendingEarningsOnDate,
  hitsOnSelectedDateIds
} from 'selectors/hitDatabaseDay';
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
  private static showPendingEarnings = (earningsPending: number) =>
    earningsPending > 0 ? `${formatAsCurrency(earningsPending)} pending. ` : '';

  private static showEarnings = (reward: number, bonus: number) =>
    bonus > 0
      ? `${formatAsCurrency(reward)} + ${formatAsCurrency(
          bonus
        )} (in bonuses) paid.`
      : `${formatAsCurrency(reward)} paid.`;

  private generateCardTitle = () => {
    const {
      dailyEarnings: { reward, bonus },
      earningsPending,
      numSubmitted
    } = this.props;
    const { showEarnings, showPendingEarnings } = InfoHeader;
    return `${showEarnings(reward, bonus)} ${showPendingEarnings(
      earningsPending
    )} ${numSubmitted} HITs submitted.`;
  };

  public render() {
    return this.props.numSubmitted > 0 ? (
      <Card.Section>
        <Stack vertical={false} spacing="tight" alignment="baseline">
          <PaginationButtons {...this.props} />
          <Heading>{this.generateCardTitle()}</Heading>
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
