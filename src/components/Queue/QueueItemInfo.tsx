import * as React from 'react';
import { Stack, DisplayText, Caption } from '@shopify/polaris';
import { formatAsCurrency } from '../../utils/formatting';

interface Props {
  readonly reward: number;
  readonly timeLeft: string;
}

const QueueItemInfo = ({ reward, timeLeft }: Props) => {
  return (
    <Stack vertical={false} spacing={'tight'} alignment="baseline">
      <Caption>{timeLeft}</Caption>
      <DisplayText size="small">{formatAsCurrency(reward)}</DisplayText>
    </Stack>
  );
};
export default QueueItemInfo;
