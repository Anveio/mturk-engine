import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Layout, AccountConnection } from '@shopify/polaris';
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
      <Layout.AnnotatedSection
        title="Account"
        description="Connect Mturk Engine to your Amazon MTurk account."
      >
        <AccountConnection
          action={{
            content: 'Connect',
            onAction: this.props.onConnect
          }}
          details="No account connected"
          termsOfService={
            <p>
              By clicking Connect, you are accepting Sample’s terms and
              conditions.
            </p>
          }
        />
      </Layout.AnnotatedSection>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ConnectAccountRequest>): Handlers => ({
  onConnect: () => dispatch(connectAccountRequest())
});

export default connect(null, mapDispatch)(DisconnectedAccount);
