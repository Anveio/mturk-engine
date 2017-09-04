import * as React from 'react';
import { Collapsible, Card, Stack, TextStyle } from '@shopify/polaris';
import { SearchResult } from '../../types';
import SearchCardInfoButtons from './SearchCardInfoButtons';

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
          <Stack vertical={false} distribution="equalSpacing">
            <Stack vertical spacing="tight">
              <TextStyle variation="subdued">{` ${description}`}</TextStyle>
              Time allotted:
              <TextStyle variation="subdued">{` ${timeAllotted}`}</TextStyle>
            </Stack>
            <SearchCardInfoButtons
              groupId={groupId}
              requesterId={requesterId}
            />
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

export default CollapsibleInfo;
