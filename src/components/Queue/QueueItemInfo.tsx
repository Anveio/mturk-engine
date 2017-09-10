import * as React from 'react';
import { Stack, DisplayText, Caption } from '@shopify/polaris';

interface Props {
  readonly reward: string;
  readonly timeLeft: string;
}

const QueueItemInfo = ({ reward, timeLeft }: Props) => {
  return (
    <Stack vertical={false} spacing={'tight'} alignment="baseline">
      <Caption>{timeLeft}</Caption>
      <DisplayText size="small">${reward}</DisplayText>
    </Stack>
  );
};
export default QueueItemInfo;
