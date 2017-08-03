import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import RequesterBadges from './RequesterBadges';

import { truncate } from '../../utils/formatting';

interface Props {
  requester: string;
  title: string;
}

const RequesterInfo = ({ title, requester }: Props) => {
  return (
    <Card.Section title={truncate(title)}>
      <Stack vertical spacing="tight">
        <RequesterBadges requester={requester} />
      </Stack>
    </Card.Section>
  );
};

export default RequesterInfo;
