import * as React from 'react';
import { ResourceList } from '@shopify/polaris';

import HitCard from './HitCard';

export interface Props {
  data: HitTableEntry[];
}

const HitTable = ({ data }: Props) => {
  console.log(data);
  return <ResourceList items={data} renderItem={hit => <HitCard data={hit} />} />;
};

export default HitTable;
