import * as React from 'react';
import {
  Collapsible,
  Card,
  Stack,
  TextStyle,
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
    const { description, timeAllotted, groupId, requesterId } = this.props.hit;

    return (
      <Collapsible open={this.props.open}>
        <Card.Section subdued>
          <Stack vertical spacing="loose" distribution="equalSpacing">
            <TextStyle variation="subdued">{` ${description}`}</TextStyle>
            Time allotted:
            <TextStyle variation="subdued">{` ${timeAllotted}`}</TextStyle>
            <ButtonGroup>
              <MiscActionsPopover groupId={groupId} requesterId={requesterId} />
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
