import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import RequesterBadges from './RequesterBadges';

interface Props {
  requester: string;
  title: string;
}

const RequesterInfo = ({ title, requester }: Props) => {
  return (
    <Card.Section title={title}>
      <Stack vertical spacing="tight">
        <RequesterBadges requester={requester} />
      </Stack>
    </Card.Section>
  );
};

export default RequesterInfo;
