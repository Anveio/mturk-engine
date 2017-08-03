import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import Reward from './Reward';
import HitActions from './HitActions';

export interface Props {
  data: HitTableEntry;
}

const HitRow = ({ data }: Props) => {
  const { requester, title, groupId, reward } = data;
  return (
    <Card title={title}>
      <Stack vertical={false} distribution="fill">
        <Card.Section title={requester}>{groupId}</Card.Section>
        <Stack vertical={false} distribution="trailing" alignment="fill">
          <HitActions />
          <Reward reward={reward} />
        </Stack>
      </Stack>
    </Card>
  );
};

export default HitRow;
