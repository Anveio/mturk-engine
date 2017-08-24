import * as React from 'react';
import { HitBlockMap } from '../../types';
import { Card, ResourceList, Stack } from '@shopify/polaris';
import BlockListCard from './BlockListCard';

export interface Props {
  readonly blockList: HitBlockMap;
}

export interface Handlers {
  readonly onUnblock: (groupId: string) => void;
}

const BlockList = ({ blockList, onUnblock }: Props & Handlers) => {
  return (
    <Stack vertical>
      <Card>
        <ResourceList
          items={blockList.toArray()}
          renderItem={hit => <BlockListCard item={hit} onUnblock={onUnblock} />}
        />
      </Card>
    </Stack>
  );
};

export default BlockList;
