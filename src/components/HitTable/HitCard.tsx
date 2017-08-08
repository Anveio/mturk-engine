import * as React from 'react';
import { Hit, Requester } from '../../types';
import { Card, Stack } from '@shopify/polaris';
import ActionSection from './ActionSection';
import InfoSection from './InfoSection';

export interface Props {
  readonly hit: Hit;
  readonly requester?: Requester;
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
