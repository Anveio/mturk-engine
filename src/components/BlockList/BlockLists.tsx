import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Banner } from '@shopify/polaris';
import { RootState } from '../../types';
import HitBlockList from '../../containers/HitBlockList';
import RequesterBlockList from '../../containers/RequesterBlockList';
import EmptyBlockList from './EmptyBlockList';
import { blockListsAreEmpty } from '../../selectors/blocklist';

export interface Props {
  readonly empty: boolean;
}

class BlockLists extends React.PureComponent<Props, never> {
  public render() {
    return this.props.empty ? (
      <EmptyBlockList />
    ) : (
      <Layout>
        <Layout.Section>
          <Banner status="info">
            Requester and HITs are blocked with a unique ID so you don't have to
            worry about accidentally hiding search results you don't mean to.
          </Banner>
        </Layout.Section>
        <Layout.Section>
          <RequesterBlockList />
        </Layout.Section>
        <Layout.Section>
          <HitBlockList />
        </Layout.Section>
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  empty: blockListsAreEmpty(state)
});

export default connect(mapState)(BlockLists);
