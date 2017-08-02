import * as React from 'react';
import { ResourceList } from '@shopify/polaris';

export interface Props {
  data: HitTableEntry;
}

const HitRow = ({ data }: Props) => {
  const { requester, reward, requesterId } = data;

  const props = {
    attributeOne: requester,
    attributeTwo: reward,
    attributeThree: requesterId
  };

  return <ResourceList.Item {...props} />;
};

export default HitRow;
