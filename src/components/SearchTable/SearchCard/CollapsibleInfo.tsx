import * as React from 'react';
import { Collapsible, Card, Stack, TextStyle, Caption } from '@shopify/polaris';
import { SearchResult } from '../../../types';
import MiscActionsPopover from './MiscActionsPopover';
import ExternalPlainButtons from './ExternalPlainButtons';
import BlockActionsPopover from '../../../containers/BlockActionsPopover';

export interface Props {
  readonly open: boolean;
  readonly hit: SearchResult;
}

class CollapsibleInfo extends React.PureComponent<Props, never> {
  public render() {
    const { description, timeAllotted, groupId, requester } = this.props.hit;

    return (
      <Collapsible open={this.props.open}>
        <Card.Section>
          <Stack vertical spacing="loose" distribution="equalSpacing">
            <Caption>
              Description:
              <TextStyle variation="subdued">{` ${description}`}</TextStyle>
            </Caption>
            <Caption>
              Time allotted:
              <TextStyle variation="subdued">{` ${timeAllotted}`}</TextStyle>
            </Caption>
            <Stack vertical={false} alignment="center">
              <MiscActionsPopover />
              <BlockActionsPopover requester={requester} />
              <ExternalPlainButtons
                groupId={groupId}
                requesterId={requester.id}
              />
            </Stack>
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default CollapsibleInfo;
