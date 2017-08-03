import * as React from 'react';
import { Card, ButtonGroup, Button } from '@shopify/polaris';

const HitActions = () => {
  return (
    <Card.Section>
      <ButtonGroup segmented>
        <Button primary icon="add" />
        <Button icon="view" />
      </ButtonGroup>
    </Card.Section>
  );
};

export default HitActions;
