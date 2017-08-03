import * as React from 'react';
import { ResourceList } from '@shopify/polaris';
import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';

export interface Props {
  data: HitTableEntry;
}

const HitRow = ({ data }: Props) => {
  const { requester, reward, title, groupId } = data;
  const props: ItemProps = {
    attributeOne: title,
    attributeTwo: requester,
    attributeThree: reward,
    url: `https://www.mturk.com/mturk/previewandaccept?groupId=${groupId}`
  };

  return <ResourceList.Item {...props} />;
};

export default HitRow;
