import * as React from 'react';
import { Collapsible, Card } from '@shopify/polaris';

export interface Props {
  open: boolean;
  description: string;
  timeAllotted: string;
}

class CollapsibleInfo extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Collapsible open={this.props.open}>
        <Card.Section subdued>
          Description: {this.props.description}
          Time allotted: {this.props.timeAllotted}
        </Card.Section>
      </Collapsible>
    );
  }
}

export default CollapsibleInfo;
