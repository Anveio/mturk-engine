import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Card, Stack, DisplayText, TextStyle, Caption } from '@shopify/polaris';
import {
  pendingEarningsSelector,
  todaysProjectedEarnings,
  approvedButNotPaidEarnings
} from '../../selectors/hitDatabase';
import { formatAsUsd } from '../../utils/formatting';
import DailyEarningsProgressBar from './DailyEarningsProgressBar';
import EditDailyGoalButton from './EditDailyGoalButton';
import { generateTransferEarningsUrl } from '../../utils/urls';

interface Props {
  readonly accountInfo: MaybeAccount;
  readonly pendingEarnings: number;
  readonly todaysEarnings: number;
  readonly earningsApprovedButNotPaid: number;
}

interface FieldProps {
  readonly caption: React.ReactNode;
}

class EarningsSummary extends React.PureComponent<Props, never> {
  private static Field: React.SFC<FieldProps> = ({ children, caption }) => {
    return (
      <Stack vertical={false} alignment="baseline" spacing="tight">
        <DisplayText size="medium">{children}</DisplayText>
        <Caption>{caption}</Caption>
      </Stack>
    );
  };

  private generateApprovalCaption = (earningsApprovedButNotPaid: number) =>
    earningsApprovedButNotPaid > 0 ? (
      // tslint:disable:jsx-wrap-multiline
      <>
        Pending.{' '}
        <TextStyle variation={'positive'}>
          {formatAsUsd(earningsApprovedButNotPaid)}
        </TextStyle>{' '}
        already approved
      </>
    ) : (
      <>Pending.</>
    );

  public render() {
    const {
      accountInfo,
      pendingEarnings,
      todaysEarnings,
      earningsApprovedButNotPaid
    } = this.props;
    return (
      accountInfo && (
        <Card
          title="Earnings Summary"
          actions={[
            {
              content: 'Transfer earnings',
              url: generateTransferEarningsUrl(),
              external: true
            }
          ]}
        >
          <Card.Section>
            <EarningsSummary.Field caption="Available for transfer">
              <TextStyle variation="positive">
                {formatAsUsd(accountInfo.availableEarnings)}
              </TextStyle>
            </EarningsSummary.Field>
          </Card.Section>

          <Card.Section>
            <EarningsSummary.Field
              caption={this.generateApprovalCaption(earningsApprovedButNotPaid)}
            >
              {formatAsUsd(pendingEarnings)}
            </EarningsSummary.Field>
          </Card.Section>

          <Card.Section>
            <Stack vertical>
              <EarningsSummary.Field caption="Projected for today">
                {formatAsUsd(todaysEarnings)}
              </EarningsSummary.Field>
              <DailyEarningsProgressBar />
              <EditDailyGoalButton />
            </Stack>
          </Card.Section>
        </Card>
      )
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account,
  pendingEarnings: pendingEarningsSelector(state),
  todaysEarnings: todaysProjectedEarnings(state),
  earningsApprovedButNotPaid: approvedButNotPaidEarnings(state)
});

export default connect(mapState)(EarningsSummary);
