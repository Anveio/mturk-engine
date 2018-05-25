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
    return (
      this.state.visible && (
        <Layout.Section>
          <Banner status="warning" onDismiss={this.dismissBanner}>
            If the HIT you've accepted doesn't appear after a few seconds, you
            may need to accept the HIT manually and complete a CAPTCHA.
          </Banner>
        </Layout.Section>
      )
    );
  }
}

export default QueueDisclaimer;
