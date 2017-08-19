import * as React from 'react';
import { Stack, DisplayText, Caption } from '@shopify/polaris';

interface Props {
  reward: string;
  batchSize: number;
}

const InfoContainer = ({ reward, batchSize }: Props) => {
  return (
    <Stack vertical={false} spacing={'tight'} alignment="center">
      <Caption>{batchSize} available</Caption>
      <DisplayText size="small">${reward}</DisplayText>
    </Stack>
  );
};
export default InfoContainer;
