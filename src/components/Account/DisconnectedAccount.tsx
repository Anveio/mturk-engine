import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { NonIdealState, Button } from '@blueprintjs/core';
import {
  connectAccountRequest,
  ConnectAccountRequest
} from '../../actions/connectAccount';

export interface Handlers {
  readonly onConnect: () => void;
}

class DisconnectedAccount extends React.PureComponent<Handlers, never> {
  public render() {
    return (
      <NonIdealState
        title="You can connect Mturk Engine to your Amazon MTurk account."
        description={`Connecting your account let's you track your work. 
        You will need to already be signed in to Mturk through Amazon for it to 
        work, however, because Mturk Engine does not store your log in 
        credentials and cannot log in for you.`}
        visual="user"
        action={<Button onClick={this.props.onConnect}>Connect Account</Button>}
      />
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ConnectAccountRequest>): Handlers => ({
  onConnect: () => dispatch(connectAccountRequest())
});

export default connect(null, mapDispatch)(DisconnectedAccount);
