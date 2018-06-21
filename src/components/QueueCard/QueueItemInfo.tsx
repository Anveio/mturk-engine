import * as React from 'react';
import { Stack, DisplayText } from '@shopify/polaris';
import { formatAsUsd } from '../../utils/formatting';

import QueueTimer from './QueueTimer';

interface Props {
  readonly hitId: string;
  readonly reward: number;
  readonly timeLeftInSeconds: number;
}

const QueueItemInfo: React.SFC<Props> = ({
  hitId,
  reward,
  timeLeftInSeconds
}) => {
  return (
    <Stack vertical={false} spacing={'tight'} alignment="baseline">
      <QueueTimer
        key={hitId + timeLeftInSeconds}
        timeLeftInSeconds={timeLeftInSeconds}
      />
      <DisplayText size="small">{formatAsUsd(reward)}</DisplayText>
    </Stack>
  );
};

export default QueueItemInfo;
