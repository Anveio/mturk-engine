import * as React from 'react';
import { AccountInfo } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { Layout, AccountConnection } from '@shopify/polaris';
import {
  FetchStatusSummaryRequest,
  statusSummaryRequest
} from '../../actions/statusSummary';
import Data from './Data';

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
        <Data />
      </Layout.AnnotatedSection>
    );
  }
}

const mapDispatch = (
  dispatch: Dispatch<FetchStatusSummaryRequest>
): Handlers => ({
  onDisconnect: () => dispatch(statusSummaryRequest())
});

export default connect(null, mapDispatch)(ConnectedAccount);
