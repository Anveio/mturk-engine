import * as React from 'react';
import { Card, Stack, DisplayText, ButtonGroup, Button } from '@shopify/polaris';

export interface Props {
  reward: string;
}

const Reward = ({ reward }: Props) => {
  return (
    <Card.Section>
      <Stack spacing="loose">
        <DisplayText>{reward}</DisplayText>
        <ButtonGroup segmented>
          <Button primary icon="add" />
          <Button icon="view" />
        </ButtonGroup>
      </Stack>
    </Card.Section>
  );
};

export default Reward;
