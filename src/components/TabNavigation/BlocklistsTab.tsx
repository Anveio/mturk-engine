import { Callout, Intent } from '@blueprintjs/core';
import { Layout } from '@shopify/polaris';
import * as React from 'react';
import { connect } from 'react-redux';
import { blockListsAreEmpty } from 'selectors/blocklists';
import { RootState } from '../../types';
import EmptyBlocklist from '../Blocklists/EmptyBlocklist';
import RequesterBlocklistView from '../Blocklists/RequesterBlocklistView';
import HitBlocklistView from '../Blocklists/HitBlocklistView';

interface Props {
  readonly empty: boolean;
}

class BlocklistsTab extends React.Component<Props, never> {
  public render() {
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
  empty: blockListsAreEmpty(state)
});

export default connect(mapState)(BlocklistsTab);
