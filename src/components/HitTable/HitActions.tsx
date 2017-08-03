import * as React from 'react';
import { Card, ButtonGroup, Button } from '@shopify/polaris';

const HitActions = () => {
  return (
    <Card.Section>
      <ButtonGroup>
        <Button primary>Accept</Button>
        <Button>Preview</Button>
      </ButtonGroup>
    </Card.Section>
  );
};

export default HitActions;
