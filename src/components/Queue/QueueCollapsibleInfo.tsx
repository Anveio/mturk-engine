import * as React from 'react';
import { connect } from 'react-redux';
import { Collapsible, Card, Stack, Caption } from '@shopify/polaris';
import { RootState, QueueItem } from '../../types';
import KnownRequesterButton from '../Buttons/KnownRequesterButton';
import BlockRequesterButton from '../Buttons/BlockRequesterButton';
import AddAsWatcherButton from '../Buttons/AddAsWatcherButton';
import MenuActivator from '../MenuActivator';
import QueueMenu from './QueueMenu';

interface Props {
  readonly hit: QueueItem;
  readonly expanded: boolean;
}

interface OwnProps {
  readonly hitId: string;
  readonly requesterId: string;
  readonly requesterName: string;
  readonly knownRequester: boolean;
}

class CollapsibleInfo extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { hit, expanded, knownRequester } = this.props;
    const { description, requester } = hit;

    return (
      <Collapsible open={expanded} id={hit.hitId}>
        <Card.Section>
          <Stack vertical spacing="loose">
            <Caption>{`Requester: ${requester.name}`}</Caption>
            <Caption>
              {`Description: ${description || 'No description.'}`}
            </Caption>
            {knownRequester ? (
              <KnownRequesterButton {...this.props} />
            ) : (
              undefined
            )}
            <Stack vertical={false} alignment="center">
              <MenuActivator accessibilityLabel="Additional actions">
                <QueueMenu hit={hit} />
              </MenuActivator>
              {/* We want to display a toast when a requester is blocked via the 
              queue because they have no feedback the button worked otherwise. */}
              <BlockRequesterButton requester={requester} withToast={true} />
              <AddAsWatcherButton hit={hit} />
            </Stack>
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.queue.get(ownProps.hitId),
  expanded: state.expandedQueueItems.has(ownProps.hitId)
});

export default connect(mapState)(CollapsibleInfo);
