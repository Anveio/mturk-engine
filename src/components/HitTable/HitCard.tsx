import * as React from 'react';
import { HitTableEntry, Requester } from '../../types';
import { Card, Stack } from '@shopify/polaris';
import ActionSection from './ActionSection';
import InfoSection from './InfoSection';

export interface Props {
  hit: HitTableEntry;
  requester?: Requester;
}

const HitCard = ({ hit, requester }: Props) => {
  const { requesterName, reward, title, groupId } = hit;
  return (
    <Card>
      <Stack>
        <ActionSection reward={reward} groupId={groupId} />
        <InfoSection requester={requester || requesterName} title={title} />
      </Stack>
    </Card>
  );
};

export default HitCard;
