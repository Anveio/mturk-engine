import * as React from 'react';
import { Stack, List } from '@shopify/polaris';
import RequesterBadges from './RequesterBadges';

interface Props {
  requester: string;
  title: string;
}

const HitActions = ({ title, requester }: Props) => {
  return (
    <Stack vertical spacing="tight">
      <List.Item>{title}</List.Item>
      <List.Item>{requester}</List.Item>
      <RequesterBadges requester={requester} />
    </Stack>
  );
};

export default HitActions;
