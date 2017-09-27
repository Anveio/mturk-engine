import * as React from 'react';
import { MaybeAccount, RootState } from '../../types';
import { connect } from 'react-redux';
// import { Layout, AccountConnection } from '@shopify/polaris';
import DisconectedAccount from './DisconnectedAccount';
import ConnectedAccount from './ConnectedAccount';

export interface Props {
  readonly account: MaybeAccount;
}

class Account extends React.PureComponent<Props, never> {
  public render() {
    return !this.props.account ? <DisconectedAccount /> : <ConnectedAccount />;
  }
}

const mapState = (state: RootState): Props => ({
  account: state.account
});

export default connect(mapState)(Account);
