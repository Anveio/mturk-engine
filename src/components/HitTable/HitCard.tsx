import * as React from 'react';
import { Card } from '@shopify/polaris';
export interface Props {
  data: HitTableEntry;
}

const HitRow = ({ data }: Props) => {
  const { requester, reward, title, groupId } = data;
  return (
    <Card>
      <Card.Section title={title}>{reward}</Card.Section>
      <Card.Section title={requester}>{groupId}</Card.Section>
    </Card>
  );
};

export default HitRow;
