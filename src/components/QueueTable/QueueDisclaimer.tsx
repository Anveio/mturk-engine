import * as React from 'react';
import { Layout, Banner } from '@shopify/polaris';

interface State {
  readonly visible: boolean;
}

class QueueDisclaimer extends React.PureComponent<{}, State> {
  public readonly state: State = { visible: true };

  private dismissBanner = () =>
    this.setState(() => ({
      visible: false
    }));

  public render() {
    return this.state.visible ? (
      <Layout.Section>
        <Banner status="warning" onDismiss={this.dismissBanner}>
          Mturk Engine incorrectly reports a successful accept when encountering
          a CAPTCHA. If you refresh your queue and your HIT isn't there, accept
          it manually and successfully complete the CAPTCHA.
        </Banner>
      </Layout.Section>
    ) : null;
  }
}

export default QueueDisclaimer;
