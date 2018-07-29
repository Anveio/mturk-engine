import { Callout, Intent } from '@blueprintjs/core';
import { Layout } from '@shopify/polaris';
import * as React from 'react';
import { connect } from 'react-redux';
import { blockListsAreEmpty } from 'selectors/blocklists';
import { RootState } from '../../types';
import EmptyBlocklist from '../Blocklists/EmptyBlocklist';
import RequesterBlocklistView from '../Blocklists/RequesterBlocklistView';
import HitBlocklistView from '../Blocklists/HitBlocklistView';
import { TabIndex } from 'constants/enums';

interface Props {
  readonly blocklistIsActiveTab: boolean;
  readonly empty: boolean;
}

class BlocklistsTab extends React.Component<Props, never> {
  public render() {
    if (!this.props.blocklistIsActiveTab) {
      return null;
    }

    return this.props.empty ? (
      <EmptyBlocklist />
    ) : (
      <Layout>
        <Layout.Section>
          <RequesterBlocklistView />
        </Layout.Section>
        <Layout.Section>
          <HitBlocklistView />
        </Layout.Section>
        <Layout.Section>
          <Callout intent={Intent.SUCCESS} icon="info-sign">
            Large blocklists do not slow down Mturk Engine. Feel free to grow
            them as large as you like.
          </Callout>
        </Layout.Section>
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  blocklistIsActiveTab: state.tab === TabIndex.BLOCKLIST,
  empty: blockListsAreEmpty(state)
});

export default connect(mapState)(BlocklistsTab);
