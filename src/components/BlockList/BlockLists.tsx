import * as React from 'react';
import { Stack } from '@shopify/polaris';
import HitBlockList from '../../containers/HitBlockList';
import RequesterBlockList from '../../containers/RequesterBlockList';

export interface Props {}

class BlockLists extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Stack vertical>
        <RequesterBlockList />
        <HitBlockList />
      </Stack>
    );
  }
}

export default BlockLists;
