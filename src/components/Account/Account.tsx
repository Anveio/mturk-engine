import * as React from 'react';
import { MaybeAccount, RootState } from '../../types';
import { connect, Dispatch } from 'react-redux';
import DisconectedAccount from './DisconnectedAccount';
import ConnectedAccountLayout from './ConnectedAccountLayout';
import {
  connectAccountRequest,
  ConnectAccountRequest
} from '../../actions/connectAccount';

interface Props {
  readonly account: MaybeAccount;
}

interface Handlers {
  readonly onConnect: () => void;
}

class Account extends React.PureComponent<Props & Handlers, never> {
  componentWillMount() {
    if (this.props.account) {
      this.props.onConnect();
    }
  }

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

const mapDispatch = (dispatch: Dispatch<ConnectAccountRequest>): Handlers => ({
  onConnect: () => dispatch(connectAccountRequest())
});

export default connect(mapState, mapDispatch)(Account);
