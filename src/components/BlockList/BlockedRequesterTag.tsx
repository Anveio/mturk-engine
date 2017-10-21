import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState, BlockedRequester } from '../../types';
import { Tag } from '@shopify/polaris';
import {
  UnblockRequester,
  unblockRequester
} from '../../actions/blockRequester';

import { truncate } from '../../utils/formatting';

export interface Props {
  readonly requester: BlockedRequester;
}

export interface OwnProps {
  readonly blockedRequesterId: string;
}

export interface Handlers {
  readonly onUnblock: (groupId: string) => void;
}

class BlockedHitCard extends React.PureComponent<
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

const mapDispatch = (dispatch: Dispatch<UnblockRequester>): Handlers => ({
  onUnblock: (id: string) => dispatch(unblockRequester(id))
});

export default connect(mapState, mapDispatch)(BlockedHitCard);
