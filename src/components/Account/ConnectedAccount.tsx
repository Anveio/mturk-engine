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
    return this.props.accountInfo ? (
      <Layout.AnnotatedSection
        title="Account"
        description="Disconnect your account from your Shopify store."
      >
        <AccountConnection
          connected
          action={{
            content: 'Disconnect',
            onAction: this.props.onDisconnect
          }}
          accountName="Tom Ford"
          title={`Tom Ford`}
          details={'Account id: ' + this.props.accountInfo.id}
        />
      </Layout.AnnotatedSection>
    ) : (
      <div />
    );
  }
}

const mapDispatch = (dispatch: Dispatch<DisconnectAccount>): Handlers => ({
  onDisconnect: () => dispatch(disconnectAccount())
});

export default connect(null, mapDispatch)(ConnectedAccount);
