import { Callout, Intent, NonIdealState } from '@blueprintjs/core';
import { Layout, Button } from '@shopify/polaris';
import * as React from 'react';
import { connect } from 'react-redux';
import { blockListsAreEmpty } from 'selectors/blocklists';
import { RootState } from '../../types';
import RequesterBlocklistView from '../RequesterBlocklist/RequesterBlocklistView';
import HitBlocklistView from '../HitBlocklist/HitBlocklistView';
import { TabIndex } from 'constants/enums';
import { Dispatch } from '../../../node_modules/redux';
import { changeTab } from 'actions/updateValue';

interface Props {
  readonly blocklistIsActiveTab: boolean;
  readonly empty: boolean;
}

interface Handlers {
  readonly onChangeTab: () => void;
}

class BlocklistsTab extends React.Component<Props & Handlers, never> {
  static EmptyBlocklist = ({ onChangeTab }: Handlers) => {
    return (
      <NonIdealState
        title="Your blocklists are empty."
        description="You can manage your block lists here once you've blocked a HIT or a requester."
        icon="add-to-folder"
        action={
          <Button primary onClick={onChangeTab}>
            Switch to search tab
          </Button>}
      />
    );
  };

  public render() {
    if (!this.props.blocklistIsActiveTab) {
      return null;
    }

    return this.props.empty ? (
      <Layout>
        <BlocklistsTab.EmptyBlocklist {...this.props} />
      </Layout>
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

const mapDispatch = (dispatch: Dispatch): Handlers => ({
  onChangeTab: () => dispatch(changeTab(TabIndex.SEARCH))
});

export default connect(
  mapState,
  mapDispatch
)(BlocklistsTab);
