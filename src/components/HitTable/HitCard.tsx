import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import Reward from './Reward';
// import HitActions from './HitActions';

import RequesterInfo from './RequesterInfo';

export interface Props {
  data: HitTableEntry;
}

const HitRow = ({ data }: Props) => {
  const { requester, reward, title } = data;
  return (
    <Card>
      <Stack vertical={false} distribution="leading" alignment="fill">
        <Reward reward={reward} />
        {/* <HitActions /> */}
        <RequesterInfo requester={requester} title={title} />
      </Stack>
    </Card>
  );
};

export default HitRow;
