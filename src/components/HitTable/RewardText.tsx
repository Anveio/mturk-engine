import * as React from 'react';
import { DisplayText } from '@shopify/polaris';
// import { rewardToVariation } from '../../utils/formatting';

interface Props {
  reward: string;
}

const RewardText = ({ reward }: Props) => {
  return <DisplayText size="small">${reward}</DisplayText>;
};

export default RewardText;
