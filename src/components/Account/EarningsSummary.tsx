import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Card, Stack, DisplayText, TextStyle, Caption } from '@shopify/polaris';
import { Tooltip, AnchorButton } from '@blueprintjs/core';
import { Variation } from '@shopify/polaris/types/components/TextStyle/TextStyle';
import {
  pendingEarningsSelector,
  todaysProjectedEarnings
} from '../../selectors/hitDatabase';
import { formatAsCurrency } from '../../utils/formatting';
import DailyEarningsProgressBar from './DailyEarningsProgressBar';
import EditDailyGoalButton from './EditDailyGoalButton';

export interface Props {
  readonly accountInfo: MaybeAccount;
  readonly pendingEarnings: number;
  readonly todaysEarnings: number;
}

class EarningsSummary extends React.PureComponent<Props, never> {
  static generateField = (
    value: number,
    fieldText: string,
    variation?: Variation
  ) => {
    return (
      <Stack vertical={false} alignment="baseline" spacing="tight">
        <DisplayText size="medium">
          <TextStyle variation={variation}>{formatAsCurrency(value)}</TextStyle>
        </DisplayText>
        <Caption>{fieldText}</Caption>
      </Stack>
    );
  };

  public render() {
    const { accountInfo, pendingEarnings, todaysEarnings } = this.props;
    const { generateField } = EarningsSummary;
    return accountInfo ? (
      <Card title="Earnings Summary">
        <Card.Section>
          {generateField(
            accountInfo.availableEarnings,
            'Available for transfer',
            'positive'
          )}
        </Card.Section>

        <Card.Section>
          <Tooltip
            useSmartPositioning
            content="This includes earnings from HITs that have been approved but not yet paid out."
          >
            {generateField(pendingEarnings, 'Pending')}
          </Tooltip>
        </Card.Section>

        <Card.Section>
          <Stack vertical>
            {generateField(todaysEarnings, 'Projected for today')}
            <DailyEarningsProgressBar />
            <EditDailyGoalButton />
          </Stack>
        </Card.Section>

        <Card.Section>
          <AnchorButton
            intent={0}
            className="pt-button pt-small pt-minimal"
            iconName="credit-card"
            target="_blank"
            href="https://www.mturk.com/mturk/transferearnings"
          >
            Transfer Earnings
          </AnchorButton>
        </Card.Section>
      </Card>
    ) : (
      <div />
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account,
  pendingEarnings: pendingEarningsSelector(state),
  todaysEarnings: todaysProjectedEarnings(state)
});

export default connect(mapState)(EarningsSummary);
