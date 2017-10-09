import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Avatar, Stack, Card } from '@shopify/polaris';
import { Position, Button, Toaster } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';
import {
  connectAccountRequest,
  ConnectAccountRequest
} from '../../actions/connectAccount';
import UsernameButton from './UsernameButton';

export interface Props {
  readonly accountInfo: MaybeAccount;
}

export interface Handlers {
  readonly onRefresh: () => void;
}

class UserInfo extends React.PureComponent<Props & Handlers, never> {
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
    const { accountInfo, onRefresh } = this.props;

    return accountInfo ? (
      <Card
        sectioned
        title={'Account Dashboard'}
        actions={[ { content: 'Refresh dashboard', onAction: onRefresh } ]}
      >
        <Stack vertical={false}>
          <Avatar
            customer
            size="large"
            name={accountInfo.fullName}
            initials={accountInfo.fullName}
          />
          <Stack vertical spacing="tight">
            <UsernameButton fullName={accountInfo.fullName} />

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

const mapDispatch = (dispatch: Dispatch<ConnectAccountRequest>): Handlers => ({
  onRefresh: () => dispatch(connectAccountRequest())
});

export default connect(mapState, mapDispatch)(UserInfo);
