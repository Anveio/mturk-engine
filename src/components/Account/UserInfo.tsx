import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Avatar, Stack, Card } from '@shopify/polaris';
import { Popover, Position, Button, Toaster } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';

import AccountStatisticsTable from './AccountStatisticsTable';

export interface Props {
  readonly accountInfo: MaybeAccount;
}

class UserInfo extends React.PureComponent<Props, never> {
  static CopyToaster = Toaster.create({
    position: Position.BOTTOM_RIGHT
  });

  private handleIdClick = (id: string) => {
    copy(id);
    UserInfo.CopyToaster.show({
      message: 'Worker ID copied to clipboard',
      timeout: 2000
    });
  };

  public render() {
    const { accountInfo } = this.props;

    return accountInfo ? (
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
              onClick={() => this.handleIdClick(accountInfo.id)}
            >
              {accountInfo.id}
            </Button>
          </Stack>
        </Stack>
      </Card>
    ) : (
      <div />
    );
  }
}

const mapState = (state: RootState): Props => ({
  accountInfo: state.account
});

export default connect(mapState)(UserInfo);
