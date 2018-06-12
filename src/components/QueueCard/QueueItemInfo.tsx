import * as React from 'react';
import { Stack, DisplayText } from '@shopify/polaris';
import { formatAsUsd } from '../../utils/formatting';

import QueueTimer from './QueueTimer';

interface Props {
  readonly reward: number;
  readonly timeLeftInSeconds: number;
}

const QueueItemInfo: React.SFC<Props> = ({ reward, timeLeftInSeconds }) => {
  return (
    <Stack vertical={false} spacing={'tight'} alignment="baseline">
      <QueueTimer timeLeftInSeconds={timeLeftInSeconds} />
      <DisplayText size="small">{formatAsUsd(reward)}</DisplayText>
    </Stack>
  );
};

export default QueueItemInfo;
