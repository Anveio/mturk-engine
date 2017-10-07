import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Layout, Avatar, Stack, Card } from '@shopify/polaris';
import { Popover, Position, Button } from '@blueprintjs/core';

import AccountStatisticsTable from './AccountStatisticsTable';

export interface Props {
  readonly accountInfo: MaybeAccount;
}

class UserInfo extends React.PureComponent<Props, never> {
  public render() {
    const { accountInfo } = this.props;

    return accountInfo ? (
      <Layout.Section secondary>
        <Card sectioned>
          <Stack vertical={false}>
            <Avatar
              customer
              size="large"
              name={accountInfo.fullName}
              initials={accountInfo.fullName}
            />
            <Stack vertical spacing="tight">
              <Popover position={Position.BOTTOM}>
                <Button
                  intent={0}
                  className="pt-button pt-small pt-minimal"
                  rightIconName="pt-icon-th-list"
                >
                  {accountInfo.fullName}
                </Button>
                <AccountStatisticsTable />
              </Popover>

              <Button
                rightIconName="duplicate"
                className="pt-button pt-small pt-minimal"
                onClick={() => console.log('hi')}
              >
                {accountInfo.id}
              </Button>
            </Stack>
          </Stack>
        </Card>
        
      </Layout.Section>
    ) : (
      <div />
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account
});

export default connect(mapState)(UserInfo);
