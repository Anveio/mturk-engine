import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import {
  Card,
  Stack,
  DisplayText,
  TextStyle,
  Caption,
  Button
} from '@shopify/polaris';
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
        <Card.Section>{generateField(pendingEarnings, 'Pending')}</Card.Section>
        <Card.Section>
          <Stack vertical>
            {generateField(todaysEarnings, 'Projected for today')}
            <DailyEarningsProgressBar />
            <EditDailyGoalButton />
          </Stack>
        </Card.Section>

        <Card.Section>
          <Button
            plain
            external
            url="https://www.mturk.com/mturk/transferearnings"
            icon="arrowUp"
          >
            Transfer Earnings
          </Button>
        </Card.Section>
        {/* <Card.Section>
          <Caption>
            Pending and projected earnings may not be accurate if your HIT
            Database has not been recently refreshed. Refresh your HIT Database
            regularly to see the most accurate information.
          </Caption>
        </Card.Section> */}
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
