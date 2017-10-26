import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Stack } from '@shopify/polaris';
import { RootState } from '../../types';
import { recentlyBlockedRequesterIds } from '../../selectors/requesterBlocklist';
import BlockedRequesterTag from './BlockedRequesterTag';

export interface Props {
  readonly blockedRequesterIds: string[];
}

class RequesterBlockList extends React.PureComponent<Props, never> {
  public render() {
    return this.props.blockedRequesterIds.length === 0 ? (
      <div />
    ) : (
      <Card sectioned title="Recently blocked requesters">
        <Stack>
          {this.props.blockedRequesterIds.map((id: string) => (
            <BlockedRequesterTag blockedRequesterId={id} key={id} />
          ))}
        </Stack>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  blockedRequesterIds: recentlyBlockedRequesterIds(state)
});

export default connect(mapState)(RequesterBlockList);
