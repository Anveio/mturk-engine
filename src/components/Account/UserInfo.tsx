import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Avatar, Stack, Card } from '@shopify/polaris';
import { Popover, Button, Position } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';
import {
  connectAccountRequest,
  ConnectAccountRequest
} from '../../actions/connectAccount';
import UsernameButton from './UsernameButton';
import RejectionThreshold from './RejectionThreshold';
import { copyIdToast } from '../../utils/toaster';

export interface Props {
  readonly accountInfo: MaybeAccount;
}

export interface Handlers {
  readonly onRefresh: () => void;
}

class UserInfo extends React.PureComponent<Props & Handlers, never> {
  private handleIdClick = (id: string) => () => {
    copy(id);
    copyIdToast();
  };

  public render() {
    const { accountInfo, onRefresh } = this.props;

    return accountInfo ? (
      <Card
        sectioned
        title={'Account Dashboard'}
        actions={[{ content: 'Refresh dashboard', onAction: onRefresh }]}
      >
        <Stack vertical={false}>
          <Avatar
            customer
            size="large"
            name={accountInfo.fullName}
            initials={accountInfo.fullName}
            accessibilityLabel="Your first and last name on Mechanical Turk."
          />
          <Stack vertical spacing="tight">
            <UsernameButton fullName={accountInfo.fullName} />

            <Button
              rightIconName="duplicate"
              className="pt-button pt-small pt-minimal"
              onClick={this.handleIdClick(accountInfo.id)}
              intent={-1}
            >
              {accountInfo.id}
            </Button>
            <Popover position={Position.BOTTOM_LEFT}>
              <Button
                rightIconName="calculator"
                className="pt-button pt-small pt-minimal"
                intent={-1}
              >
                Acceptance Rate Calculator
              </Button>
              <RejectionThreshold />
            </Popover>
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
