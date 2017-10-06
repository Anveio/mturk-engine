import * as React from 'react';
import { MaybeAccount, RootState } from '../../types';
import { connect } from 'react-redux';
import DisconectedAccount from './DisconnectedAccount';
import ConnectedAccountLayout from './ConnectedAccountLayout';

export interface Props {
  readonly account: MaybeAccount;
}

class Account extends React.PureComponent<Props, never> {
  public render() {
    return !this.props.account ? (
      <DisconectedAccount />
    ) : (
      <ConnectedAccountLayout />
    );
  }
}

const mapState = (state: RootState): Props => ({
  account: state.account
});

export default connect(mapState)(Account);
