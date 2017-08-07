import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import RequesterBadges from './RequesterBadges';
import TOpticonButton from './TOpticonButton';

import { truncate } from '../../utils/formatting';

interface Props {
  requester: string;
  title: string;
}

const RequesterInfo = ({ title, requester }: Props) => {
  return (
    <Card.Section title={truncate(title)}>
      <Stack spacing="tight">
        <TOpticonButton score={2.1} requesterName={requester} />
        <RequesterBadges requester={requester} />
      </Stack>
    </Card.Section>
  );
};

export default RequesterInfo;
