import * as React from 'react';
import { Stack, DisplayText, Caption } from '@shopify/polaris';
import { formatAsCurrency } from '../../utils/formatting';
import { displaySecondsAsHHMMSS } from '../../utils/dates';

interface Props {
  readonly reward: number;
  readonly timeLeft: number;
}

const QueueItemInfo: React.SFC<Props> = ({ reward, timeLeft }) => {
  return (
    <Stack vertical={false} spacing={'tight'} alignment="baseline">
      <Caption>{displaySecondsAsHHMMSS(timeLeft)}</Caption>
      <DisplayText size="small">{formatAsCurrency(reward)}</DisplayText>
    </Stack>
  );
};
export default QueueItemInfo;
