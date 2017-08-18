import * as React from 'react';
import { SearchItem, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import InfoContainer from './RewardText';
import { generateItemProps } from '../../utils/hitItem';

export interface Props {
  readonly hit: SearchItem;
  readonly requester?: Requester;
}

const HitCard = ({ hit, requester }: Props) => {
  return (
    <ResourceList.Item
      {...generateItemProps(hit, requester)}
      attributeThree={<InfoContainer reward={hit.reward} batchSize={hit.batchSize} />}
    />
  );
};

export default HitCard;
