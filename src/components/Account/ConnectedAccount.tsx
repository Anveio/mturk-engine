import * as React from 'react';
import { AccountInfo } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { Layout, AccountConnection } from '@shopify/polaris';
import {
  disconnectAccount,
  DisconnectAccount
} from '../../actions/connectAccount';

export interface Handlers {
  readonly onDisconnect: () => void;
}

export interface OwnProps {
  readonly accountInfo: AccountInfo;
}

class ConnectedAccount extends React.PureComponent<OwnProps & Handlers, never> {
  public render() {
    return (
      <Layout.AnnotatedSection
        title="Account"
        description="Disconnect Mturk Engine from your Amazon MTurk account."
      >
        <AccountConnection
          connected
          action={{
            content: 'Disconnect',
            onAction: this.props.onDisconnect
          }}
          accountName={this.props.accountInfo.fullName}
          title={this.props.accountInfo.fullName}
          details={'Worker ID: ' + this.props.accountInfo.id}
        />
      </Layout.AnnotatedSection>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<DisconnectAccount>): Handlers => ({
  onDisconnect: () => dispatch(disconnectAccount())
});

export default connect(null, mapDispatch)(ConnectedAccount);
