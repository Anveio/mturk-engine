import * as React from 'react';
import { Stack, Caption, Badge } from '@shopify/polaris';

interface Props {
  requester: string;
}

const BadgeList = ({ requester }: Props) => {
  return (
    <Stack>
      <Caption>{requester}</Caption>
      <Badge status="success">High T.O.</Badge>
    </Stack>
  );
};

export default BadgeList;
