import * as React from 'react';
import { Card } from '@shopify/polaris';

export interface Props {
  data: HitTableEntry;
}

const HitRow = ({ data }: Props) => {
  const { requester, reward, title } = data;

  return (
    <Card sectioned title={title}>
      <p>
        Requester: {requester}, Reward: {reward}
      </p>
    </Card>
  );
};

export default HitRow;
