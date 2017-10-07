import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Card, Stack, DisplayText, TextStyle, Caption } from '@shopify/polaris';
import { pendingEarningsSelector } from '../../selectors/hitDatabase';
import { formatAsCurrency } from '../../utils/formatting';

export interface Props {
  readonly accountInfo: MaybeAccount;
  readonly pendingEarnings: number;
  readonly projectedDailyEarnings: number;
}

class ImportantInfo extends React.PureComponent<Props, never> {
  public render() {
    const { accountInfo, pendingEarnings } = this.props;

    return accountInfo ? (
      <Card sectioned title="Earnings Summary">
        <Stack vertical>
          <DisplayText>
            <TextStyle variation="positive">
              {formatAsCurrency(accountInfo.availableEarnings)}
            </TextStyle>
            <Caption>Availible for transfer</Caption>
          </DisplayText>
          <DisplayText>
            <TextStyle>{formatAsCurrency(pendingEarnings)}</TextStyle>
            <Caption>Pending</Caption>
          </DisplayText>
          <DisplayText>
            {formatAsCurrency(123)}
            <Caption>Projected earnings for today</Caption>
          </DisplayText>
        </Stack>
      </Card>
    ) : (
      <div />
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account,
  pendingEarnings: pendingEarningsSelector(state)
});

export default connect(mapState)(ImportantInfo);
