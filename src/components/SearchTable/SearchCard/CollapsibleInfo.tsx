import * as React from 'react';
import { Collapsible, Card, Stack, TextStyle } from '@shopify/polaris';
import { SearchResult } from '../../../types';
import MiscActionsPopover from './MiscActionsPopover';

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
        <Card
          sectioned
          subdued
          primaryFooterAction={{
            content: 'Block Requester',
            onAction: this.props.onBlockRequester
          }}
        >
          <Stack vertical spacing="loose" distribution="equalSpacing">
            <TextStyle variation="subdued">{` ${description}`}</TextStyle>
            Time allotted:
            <TextStyle variation="subdued">{` ${timeAllotted}`}</TextStyle>
            <MiscActionsPopover groupId={groupId} requesterId={requesterId} />
          </Stack>
        </Card>
      </Collapsible>
    );
  }
}

export default CollapsibleInfo;
