import * as React from 'react';
import { connect } from 'react-redux';
import { Collapsible, Card, Stack, ButtonGroup } from '@shopify/polaris';
import { RootState, BlockedHit, GroupId } from '../../types';
import KnownRequesterButton from '../Buttons/KnownRequesterButton';
import BlockRequesterButton from '../Buttons/BlockRequesterButton';
import MenuActivator from '../Menu/MenuActivator';
import ExternalPlainButtons from '../Buttons/ExternalPlainButtons';
import { hitDatabaseToRequesterMap } from '../../selectors/hitDatabase';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { handleCopy } from 'utils/clipboard';

interface Props {
  readonly hit: BlockedHit;
  readonly knownRequester: boolean;
}

interface OwnProps {
  readonly groupId: GroupId;
  readonly expanded: boolean;
  readonly requesterId: string;
  readonly requesterName: string;
}

class BlockedHitCardCollapsible extends React.PureComponent<
  Props & OwnProps,
  never
> {
  public render() {
    const { hit, expanded = true, knownRequester } = this.props;
    const { requester } = hit;

    return (
      <Collapsible open={expanded} id={hit.groupId}>
        <Card.Section>
          <Stack vertical spacing="loose">
            {knownRequester && <KnownRequesterButton {...this.props} />}
            <Stack vertical={false} alignment="center">
              <MenuActivator accessibilityLabel="Additional actions">
                <Menu>
                  <MenuDivider title="Copy" />
                  <MenuItem
                    icon="duplicate"
                    onClick={handleCopy(
                      hit.title,
                      `"${hit.title}" copied to clipboard.`
                    )}
                    text="HIT title"
                  />
                  <MenuItem
                    icon="duplicate"
                    onClick={handleCopy(
                      hit.requester.name,
                      `"${hit.requester.name}" copied to clipboard.`
                    )}
                    text="Requester name"
                  />
                  <MenuItem
                    icon="duplicate"
                    onClick={handleCopy(
                      hit.requester.id,
                      `Requester ID copied to clipboard.`
                    )}
                    text="Requester ID"
                  />
                </Menu>
              </MenuActivator>
              {/* We want to display a toast when a requester is blocked via the 
              queue because they have no feedback the button worked otherwise. */}
              <BlockRequesterButton
                requester={requester}
                withToast={true}
                withTooltip={false}
              />
              <ButtonGroup>
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
  hit: state.hitBlocklist.get(ownProps.groupId),
  knownRequester: hitDatabaseToRequesterMap(state).has(ownProps.requesterId)
});

export default connect(mapState)(BlockedHitCardCollapsible);
