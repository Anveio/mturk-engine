import * as React from 'react';
import { Card, Stack, DisplayText, ButtonGroup, Button } from '@shopify/polaris';

export interface Props {
  reward: string;
}

const Actionable = ({ reward }: Props) => {
  return (
    <Card.Section>
      <Stack spacing="loose">
        <ButtonGroup segmented>
          <Button icon="view" />
          <Button primary icon="add" />
        </ButtonGroup>
        <DisplayText>{reward}</DisplayText>
      </Stack>
    </Card.Section>
  );
};

export default Actionable;
