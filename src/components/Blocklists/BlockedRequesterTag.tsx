import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, BlockedRequester } from '../../types';
import { Tag } from '@shopify/polaris';
import { unblockSingleRequester } from '../../actions/blockRequester';

import { truncate } from '../../utils/formatting';

interface Props {
  readonly requester: BlockedRequester;
}

interface OwnProps {
  readonly blockedRequesterId: string;
}

interface Handlers {
  readonly onUnblock: (groupId: string) => void;
}

class BlockedRequesterTag extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private handleUnblock = () => this.props.onUnblock(this.props.requester.id);

  public render() {
    return (
      <Tag onRemove={this.handleUnblock}>
        {truncate(this.props.requester.name, 30)}
      </Tag>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  requester: state.requesterBlocklist.get(ownProps.blockedRequesterId)
});

const mapDispatch: Handlers = {
  onUnblock: unblockSingleRequester
};

export default connect(
  mapState,
  mapDispatch
)(BlockedRequesterTag);
