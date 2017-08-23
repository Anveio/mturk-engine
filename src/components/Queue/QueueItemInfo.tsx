import * as React from 'react';
import { Stack, DisplayText, Caption } from '@shopify/polaris';

interface Props {
  reward: string;
  timeLeft: string;
}

const QueueItemInfo = ({ reward, timeLeft }: Props) => {
  return (
    <Stack vertical={false} spacing={'tight'} alignment="center">
      <Caption>{timeLeft}</Caption>
      <DisplayText size="small">${reward}</DisplayText>
    </Stack>
  );
};
export default QueueItemInfo;
