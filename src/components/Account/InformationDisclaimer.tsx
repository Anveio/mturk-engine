import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  FetchStatusSummaryRequest,
  statusSummaryRequest
} from '../../actions/statusSummary';

import { Layout, Banner } from '@shopify/polaris';

interface State {
  readonly visible: boolean;
}

interface Handlers {
  readonly onRefreshDb: () => void;
}

class InformationDisclaimer extends React.PureComponent<Handlers, State> {
  state: State = { visible: true };

  // private handleRefresh = () => {
  //   this.props.onRefreshDb();
  //   this.toggleVisibility();
  // };

  private toggleVisibility = () =>
    this.setState((prevState: State) => ({
      visible: !prevState.visible
    }));

  public render() {
    return this.state.visible ? (
      <Layout.Section>
        <Banner status="info" onDismiss={this.toggleVisibility}>
          Pending and projected earnings rely on your HIT Database to be up to
          date in order to be accurate. Click the "Refresh Database" button
          under your HIT Database regularly to see the most accurate
          information.
        </Banner>
      </Layout.Section>
    ) : null;
  }
}

const mapDispatch = (
  dispatch: Dispatch<FetchStatusSummaryRequest>
): Handlers => ({
  onRefreshDb: () => dispatch(statusSummaryRequest())
});

export default connect(null, mapDispatch)(InformationDisclaimer);
