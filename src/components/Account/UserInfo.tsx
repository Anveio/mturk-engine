import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, MaybeAccount } from '../../types';
import { Avatar, Stack, Card } from '@shopify/polaris';
import { Popover, Button, Position, Intent } from '@blueprintjs/core';
import {
  connectAccountRequest,
  ConnectAccountRequest
} from '../../actions/connectAccount';
import UsernameButton from './UsernameButton';
import { SMALL_MINIMAL_BUTTON } from 'constants/blueprint';
import CopyTextButton from '../Buttons/CopyTextButton';
import AcceptanceRateCalculator from './AcceptanceRateCalculator';

interface Props {
  readonly accountInfo: MaybeAccount;
}

interface Handlers {
  readonly onRefresh: () => void;
}

class UserInfo extends React.PureComponent<Props & Handlers, never> {
  public render() {
    const { accountInfo, onRefresh } = this.props;

    return (
      accountInfo && (
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
              <CopyTextButton
                copyText={accountInfo.id}
                toastText={'Worker ID copied to clipboard.'}
                helpText={'Copy your worker ID.'}
              />
              <Popover position={Position.BOTTOM_LEFT}>
                <Button
                  rightIcon="calculator"
                  className={SMALL_MINIMAL_BUTTON}
                  intent={Intent.NONE}
                >
                  Acceptance Rate Calculator
                </Button>
                <AcceptanceRateCalculator />
              </Popover>
            </Stack>
          </Stack>
        </Card>
      )
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
