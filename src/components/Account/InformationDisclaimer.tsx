import * as React from 'react';

import { Layout, Banner } from '@shopify/polaris';

interface State {
  readonly visible: boolean;
}

class InformationDisclaimer extends React.PureComponent<{}, State> {
  public readonly state: State = { visible: true };

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

export default InformationDisclaimer;
