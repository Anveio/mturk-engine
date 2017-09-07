import * as React from 'react';
import { Collapsible, Card, Stack, TextStyle } from '@shopify/polaris';
import { SearchResult } from '../../../types';
import MiscActionsPopover from './MiscActionsPopover';

export interface Props {
  open: boolean;
  hit: SearchResult;
}

class CollapsibleInfo extends React.PureComponent<Props, never> {
  public render() {
    const { description, timeAllotted, groupId, requesterId } = this.props.hit;

    return (
      <Collapsible open={this.props.open}>
        <Card.Section subdued>
          <Stack vertical spacing="loose" distribution="equalSpacing">
            <TextStyle variation="subdued">{` ${description}`}</TextStyle>
            Time allotted:
            <TextStyle variation="subdued">{` ${timeAllotted}`}</TextStyle>
            <MiscActionsPopover groupId={groupId} requesterId={requesterId} />
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default CollapsibleInfo;
