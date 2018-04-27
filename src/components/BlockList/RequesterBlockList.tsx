import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Stack, Heading, Button } from '@shopify/polaris';
import { RootState } from '../../types';
import { recentlyBlockedRequesterIds } from '../../selectors/requesterBlocklist';
import BlockedRequesterTag from './BlockedRequesterTag';

interface Props {
  readonly blockedRequesterIds: string[];
  readonly blocklistSize: number;
}

class RequesterBlockList extends React.PureComponent<Props, never> {
  public render() {
    const { blockedRequesterIds, blocklistSize } = this.props;
    return (
      blockedRequesterIds.length > 0 && (
        <Card sectioned>
          <Stack vertical={true}>
            <Stack vertical={false}>
              <Stack.Item fill>
                <Heading>
                  Recently blocked requesters ({blocklistSize} total)
                </Heading>
              </Stack.Item>

              <Stack.Item>
                <Button plain disclosure>
                  Sweep
                </Button>
              </Stack.Item>
            </Stack>
            <Stack>
              {blockedRequesterIds.map((id: string) => (
                <BlockedRequesterTag blockedRequesterId={id} key={id} />
              ))}
            </Stack>
          </Stack>
        </Card>
      )
    );
  }
}

const mapState = (state: RootState): Props => ({
  blockedRequesterIds: recentlyBlockedRequesterIds(state),
  blocklistSize: state.requesterBlocklist.size
});

export default connect(mapState)(RequesterBlockList);
