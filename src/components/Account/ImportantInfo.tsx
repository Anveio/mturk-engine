import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Layout, Card } from '@shopify/polaris';
import { pendingEarnings } from '../../selectors/hitDatabase';

export interface Props {
  readonly accountInfo: MaybeAccount;
  readonly pendingEarnings: number;
}

class UserInfo extends React.PureComponent<Props, never> {
  public render() {
    const { accountInfo } = this.props;

    return accountInfo ? (
      <Layout.Section secondary>
        <Card sectioned>
          {accountInfo.availableEarnings}
          {accountInfo.lifetimeHitEarnings}
          {accountInfo.lifetimeBonusEarnings}
          {accountInfo.availableEarnings}
          {accountInfo.availableEarnings}
        </Card>
      </Layout.Section>
    ) : (
      <div />
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account,
  pendingEarnings: pendingEarnings(state)
});

export default connect(mapState)(UserInfo);
