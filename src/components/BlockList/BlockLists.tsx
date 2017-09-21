import * as React from 'react';
import { connect } from 'react-redux';
import { Layout } from '@shopify/polaris';
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
      <div>
        <Layout.Section>
          <RequesterBlockList />
        </Layout.Section>
        <Layout.Section>
          <HitBlockList />
        </Layout.Section>
      </div>
    );
  }
}

const mapState = (state: RootState): Props => ({
  empty: blockListsAreEmpty(state)
});

export default connect(mapState)(BlockLists);
