import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Card, Stack, DisplayText, TextStyle, Caption } from '@shopify/polaris';
import { Variation } from '@shopify/polaris/types/components/TextStyle/TextStyle';
import {
  pendingEarningsSelector,
  todaysProjectedEarnings
} from '../../selectors/hitDatabase';
import { formatAsCurrency } from '../../utils/formatting';

export interface Props {
  readonly accountInfo: MaybeAccount;
  readonly pendingEarnings: number;
  readonly projectedDailyEarnings: number;
}

class EarningsSummary extends React.PureComponent<Props, never> {
  static generateField = (
    value: number,
    fieldText: string,
    variation?: Variation
  ) => {
    return (
      <Stack vertical={false} alignment="baseline" spacing="tight">
        <DisplayText size="large">
          <TextStyle variation={variation}>{formatAsCurrency(value)}</TextStyle>
        </DisplayText>
        <Caption>{fieldText}</Caption>
      </Stack>
    );
  };

  public render() {
    const { accountInfo, pendingEarnings, projectedDailyEarnings } = this.props;
    const { generateField } = EarningsSummary;
    return accountInfo ? (
      <Card sectioned title="Earnings Summary">
        <Stack vertical>
          {generateField(
            accountInfo.availableEarnings,
            'Available for transfer',
            'positive'
          )}
          {generateField(projectedDailyEarnings, 'Projected for today')}
          {generateField(pendingEarnings, 'Pending')}
        </Stack>
      </Card>
    ) : (
      <div />
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account,
  pendingEarnings: pendingEarningsSelector(state),
  projectedDailyEarnings: todaysProjectedEarnings(state)
});

export default connect(mapState)(EarningsSummary);
