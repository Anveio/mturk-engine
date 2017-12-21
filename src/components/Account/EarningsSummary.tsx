import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Card, Stack, DisplayText, TextStyle, Caption } from '@shopify/polaris';
import { Tooltip } from '@blueprintjs/core';
import {
  pendingEarningsSelector,
  todaysProjectedEarnings
} from '../../selectors/hitDatabase';
import { formatAsCurrency } from '../../utils/formatting';
import DailyEarningsProgressBar from './DailyEarningsProgressBar';
import EditDailyGoalButton from './EditDailyGoalButton';

interface Props {
  readonly accountInfo: MaybeAccount;
  readonly pendingEarnings: number;
  readonly todaysEarnings: number;
}

interface FieldProps {
  readonly captionText: string;
}

class EarningsSummary extends React.PureComponent<Props, never> {
  private static Field: React.SFC<FieldProps> = ({ children, captionText }) => {
    return (
      <Stack vertical={false} alignment="baseline" spacing="tight">
        <DisplayText size="medium">{children}</DisplayText>
        <Caption>{captionText}</Caption>
      </Stack>
    );
  };

  public render() {
    const { accountInfo, pendingEarnings, todaysEarnings } = this.props;
    return accountInfo ? (
      <Card
        title="Earnings Summary"
        actions={[
          {
            content: 'Transfer Earnings',
            url: 'https://www.mturk.com/mturk/transferearnings',
            external: true
          }
        ]}
      >
        <Card.Section>
          <EarningsSummary.Field captionText="Available for transfer">
            <TextStyle variation="positive">
              {formatAsCurrency(accountInfo.availableEarnings)}
            </TextStyle>
          </EarningsSummary.Field>
        </Card.Section>

        <Card.Section>
          <Tooltip content="This includes earnings from HITs that have been approved but not yet paid out.">
            <EarningsSummary.Field captionText="Pending">
              <TextStyle>{formatAsCurrency(pendingEarnings)}</TextStyle>
            </EarningsSummary.Field>
          </Tooltip>
        </Card.Section>

        <Card.Section>
          <Stack vertical>
            <EarningsSummary.Field captionText="Projected for today">
              {formatAsCurrency(todaysEarnings)}
            </EarningsSummary.Field>
            <DailyEarningsProgressBar />
            <EditDailyGoalButton />
          </Stack>
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
