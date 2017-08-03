import * as React from 'react';
import { List, Stack, Badge } from '@shopify/polaris';

interface Props {
  requester: string;
}

const BadgeList = ({ requester }: Props) => {
  return (
    <List.Item>
      <Stack>
        <Badge status="success">High T.O.</Badge>
      </Stack>
    </List.Item>
  );
};

export default BadgeList;
