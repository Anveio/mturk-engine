import * as React from 'react';
import { ResourceList } from '@shopify/polaris';

export interface Props {
  data: HitTableEntry;
}

const HitRow = ({ data }: Props) => {
  const { requester, reward, description } = data;

  const props = {
    attributeOne: description,
    attributeTwo: requester,
    attributeThree: reward
  };

  return <ResourceList.Item {...props} />;
};

export default HitRow;
