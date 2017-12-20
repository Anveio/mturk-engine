import * as React from 'react';
import { Stack, DisplayText } from '@shopify/polaris';
import { formatAsCurrency } from '../../utils/formatting';

import QueueTimer from './QueueTimer';

interface Props {
  readonly reward: number;
  readonly timeLeft: number;
}

const QueueItemInfo: React.SFC<Props> = ({ reward, timeLeft }) => {
  return (
    <Stack vertical={false} spacing={'tight'} alignment="baseline">
      <QueueTimer initialTimeLeft={timeLeft} />
      <DisplayText size="small">{formatAsCurrency(reward)}</DisplayText>
    </Stack>
  );
};

export default QueueItemInfo;
