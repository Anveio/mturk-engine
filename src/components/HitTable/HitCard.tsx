import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import PrimarySection from './PrimarySection';
// import HitActions from './HitActions';

import InfoSection from './InfoSection';

export interface Props {
  data: HitTableEntry;
}

const HitCard = ({ data }: Props) => {
  const { requester, reward, title } = data;
  return (
    <Card>
      <Stack vertical={false} distribution="leading">
        <PrimarySection reward={reward} />
        <InfoSection requester={requester} title={title} />
      </Stack>
    </Card>
  );
};

export default HitCard;
