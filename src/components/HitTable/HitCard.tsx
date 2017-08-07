import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';

import ActionSection from './ActionSection';
import InfoSection from './InfoSection';

export interface Props {
  hit: HitTableEntry;
}

const HitCard = ({ hit }: Props) => {
  const { requester, reward, title, groupId } = hit;
  return (
    <Card>
      <Stack>
        <ActionSection reward={reward} groupId={groupId} />
        <InfoSection requester={requester} title={title} />
      </Stack>
    </Card>
  );
};

export default HitCard;
