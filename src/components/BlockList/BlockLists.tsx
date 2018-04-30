import * as React from 'react';
import { connect } from 'react-redux';
import { Layout } from '@shopify/polaris';
import { RootState } from '../../types';
import HitBlockList from './HitBlockList';
import RequesterBlockList from './RequesterBlockList';
import EmptyBlockList from './EmptyBlockList';
import { blockListsAreEmpty } from 'selectors/blocklists';

interface Props {
  readonly empty: boolean;
}

class BlockLists extends React.PureComponent<Props, never> {
  public render() {
    return this.props.empty ? (
      <EmptyBlockList />
    ) : (
      <Layout>
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
