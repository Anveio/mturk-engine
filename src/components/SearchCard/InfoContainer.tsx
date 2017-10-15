import * as React from 'react';
import { Stack, DisplayText, Caption } from '@shopify/polaris';
import { formatAsCurrency } from '../../utils/formatting';

interface Props {
  readonly reward: number;
  readonly batchSize: number;
}

const InfoContainer: React.SFC<Props> = ({ reward, batchSize }) => (
  <Stack vertical={false} spacing={'tight'} alignment="baseline">
    <Caption>{batchSize} available</Caption>
    <DisplayText size="small">{formatAsCurrency(reward)}</DisplayText>
  </Stack>
);

export default InfoContainer;
