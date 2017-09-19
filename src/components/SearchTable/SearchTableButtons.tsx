import * as React from 'react';
import { Stack, ButtonGroup, Button } from '@shopify/polaris';

export interface Props {}

class CollapsibleInfo extends React.PureComponent<{}, never> {
  public render() {
    return (
      <Stack vertical={false} alignment="center">
        <ButtonGroup>
          <Button plain>Mark all as read</Button>
          <Button plain>Collapse all</Button>
        </ButtonGroup>
      </Stack>
    );
  }
}

export default CollapsibleInfo;
