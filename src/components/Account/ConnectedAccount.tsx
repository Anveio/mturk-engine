import * as React from 'react';
import { RootState, MaybeAccount } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { Layout, AccountConnection } from '@shopify/polaris';
import {
  connectAccountRequest,
  ConnectAccountRequest
} from '../../actions/connectAccount';

export interface Handlers {
  readonly onConnect: () => void;
}

export interface Props {
  readonly accountInfo: MaybeAccount;
}

class ConnectedAccount extends React.PureComponent<Props & Handlers, never> {
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
            onAction: () => {}
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

const mapState = (state: RootState): Props => ({
  accountInfo: state.account
});

const mapDispatch = (dispatch: Dispatch<ConnectAccountRequest>): Handlers => ({
  onConnect: () => dispatch(connectAccountRequest())
});

export default connect(mapState, mapDispatch)(ConnectedAccount);
