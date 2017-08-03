import * as React from 'react';
import { Card, DisplayText } from '@shopify/polaris';

export interface Props {
  reward: string;
}

const Reward = ({ reward }: Props) => {
  return (
    <Card.Section>
      <DisplayText size="large">{reward}</DisplayText>
    </Card.Section>
  );
};

export default Reward;
