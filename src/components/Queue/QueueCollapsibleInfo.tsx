import * as React from 'react';
import { connect } from 'react-redux';
import {
  Collapsible,
  Card,
  Stack,
  Caption,
  ButtonGroup
} from '@shopify/polaris';
import { RootState, QueueItem } from '../../types';
import KnownRequesterButton from '../Buttons/KnownRequesterButton';
import BlockRequesterButton from '../Buttons/BlockRequesterButton';
import AddAsWatcherButton from '../Buttons/AddAsWatcherButton';
import MenuActivator from '../HitActionMenu/MenuActivator';
import HitActionMenu from '../HitActionMenu/HitActionMenu';
import ExternalPlainButtons from '../Buttons/ExternalPlainButtons';
import TOpticonButton from '../Buttons/TOpticonButton';
import { hitDatabaseToRequesterMap } from 'selectors/hitDatabase';

interface Props {
  readonly hit: QueueItem;
  readonly expanded: boolean;
  readonly knownRequester: boolean;
}

interface OwnProps {
  readonly hitId: string;
  readonly requesterId: string;
  readonly requesterName: string;
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
            {knownRequester && <KnownRequesterButton {...this.props} />}
            <Stack vertical={false} alignment="center">
              <MenuActivator accessibilityLabel="Additional actions">
                <HitActionMenu hit={hit} queueItem={hit} />
              </MenuActivator>
              {/* We want to display a toast when a requester is blocked via the 
              queue because they have no feedback the button worked otherwise. */}
              <BlockRequesterButton requester={requester} withToast={true} />
              <AddAsWatcherButton hit={hit} />
              <ButtonGroup>
                <TOpticonButton
                  requesterId={hit.requester.id}
                  turkopticon={hit.requester.turkopticon}
                />
                <ExternalPlainButtons.TurkopticonTwoLinkButton
                  requesterId={hit.requester.id}
                />
              </ButtonGroup>
            </Stack>
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.queue.get(ownProps.hitId),
  expanded: state.expandedQueueItems.has(ownProps.hitId),
  knownRequester: hitDatabaseToRequesterMap(state).has(ownProps.requesterId)
});

export default connect(mapState)(CollapsibleInfo);
