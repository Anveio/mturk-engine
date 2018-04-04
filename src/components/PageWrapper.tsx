import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { connect } from 'react-redux';
import { Page } from '@shopify/polaris';
import { RootState } from 'types';
import { APPLICATION_TITLE } from 'constants/misc';
import { showPlainToast } from 'utils/toaster';

interface Props {
  readonly workerId: string | null;
}

class PageWrapper extends React.PureComponent<Props, never> {
  private static generateCopyIdButton = (id: string) => ({
    content: 'Copy ID',
    onAction: () => {
      copy(id);
      showPlainToast('Worker ID copied to clipboard.');
    }
  });

  public render() {
    return (
      <Page
        title={APPLICATION_TITLE}
        primaryAction={
          this.props.workerId
            ? PageWrapper.generateCopyIdButton(this.props.workerId)
            : undefined
        }
      >
        {this.props.children}
      </Page>
    );
  }
}

const mapState = (state: RootState): Props => ({
  workerId: state.account && state.account.id
});

export default connect(mapState)(PageWrapper);
