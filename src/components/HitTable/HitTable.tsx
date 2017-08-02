import * as React from 'react';
import { ResourceList } from '@shopify/polaris';

import HitRow from './HitRow';

export interface Props {
  rows: HitTableEntry[];
}

const HitTable = ({ rows }: Props) => {
  return (
    <ResourceList items={rows} renderItem={data => <HitRow data={data} />} />
  );
};

export default HitTable;
