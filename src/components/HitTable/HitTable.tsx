import * as React from 'react';
import { ResourceList } from '@shopify/polaris';

// import HitRow from './HitRow';
import HitCard from './HitCard';

export interface Props {
  rows: HitTableEntry[];
}

const HitTable = ({ rows }: Props) => {
  // return <ResourceList items={rows} renderItem={data => <HitRow data={data} />} />;
  return <ResourceList items={rows} renderItem={data => <HitCard data={data} />} />;
};

export default HitTable;
