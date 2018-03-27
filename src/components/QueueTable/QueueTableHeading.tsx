import * as React from 'react';
import { Card, Stack, Heading, Button } from '@shopify/polaris';
import { pluralize } from 'utils/formatting';

interface Props {
  readonly queueSize: number;
}

interface Handlers {
  readonly onRefresh: () => void;
}

class QueueTableHeading extends React.Component<Props & Handlers, never> {
  public render() {
    const { queueSize, onRefresh } = this.props;
    return (
      <Card.Section>
        <Stack vertical={false}>
          <Stack.Item fill>
            <Heading>
              {queueSize} {pluralize('item', 'items')(queueSize)} in queue.
            </Heading>
          </Stack.Item>
          <Stack.Item>
            <Button plain onClick={onRefresh}>
              Refresh Queue
            </Button>
          </Stack.Item>
        </Stack>
      </Card.Section>
    );
  }
}
export default QueueTableHeading;
