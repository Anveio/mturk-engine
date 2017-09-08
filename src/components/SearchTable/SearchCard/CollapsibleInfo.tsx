import * as React from 'react';
import {
  Collapsible,
  Card,
  Stack,
  TextStyle,
  Caption,
  ButtonGroup
} from '@shopify/polaris';
import { SearchResult } from '../../../types';
import MiscActionsPopover from './MiscActionsPopover';
import BlockActionsPopover from './BlockActionsPopover';

export interface Props {
  readonly open: boolean;
  readonly hit: SearchResult;
}

export interface Handlers {
  readonly onBlockRequester: () => void;
}

class CollapsibleInfo extends React.PureComponent<Props & Handlers, never> {
  public render() {
    const { description, timeAllotted, groupId, requester } = this.props.hit;

    return (
      <Collapsible open={this.props.open}>
        <Card.Section subdued>
          <Stack vertical spacing="loose" distribution="equalSpacing">
            <Caption>
              Description:
              <TextStyle variation="subdued">{` ${description}`}</TextStyle>
            </Caption>
            <Caption>
              Time allotted:
              <TextStyle variation="subdued">{` ${timeAllotted}`}</TextStyle>
            </Caption>
            <ButtonGroup>
              <MiscActionsPopover groupId={groupId} requesterId={requester.id} />
              <BlockActionsPopover
                onBlockRequester={this.props.onBlockRequester}
              />
            </ButtonGroup>
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default CollapsibleInfo;
