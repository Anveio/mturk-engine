import * as React from 'react';
import { Stack, DisplayText, Caption } from '@shopify/polaris';
import { formatAsUsd } from '../../utils/formatting';
import TOpticonBadge from './TOpticonBadge';
import { SearchResult } from 'types';

interface Props {
  readonly hit: SearchResult;
}

const InfoContainer: React.SFC<Props> = ({
  hit: { groupId, reward, batchSize, requester }
}) => (
  <Stack vertical={false} alignment="baseline">
    <TOpticonBadge requesterId={requester.id} />
    <Caption>{batchSize} available</Caption>
    <DisplayText size="small">{formatAsUsd(reward)}</DisplayText>
  </Stack>
);

export default InfoContainer;
