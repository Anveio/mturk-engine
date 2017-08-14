import * as React from 'react';
import { Hit, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import { generateItemProps } from '../../utils/hitItem';

export interface Props {
  readonly hit: Hit;
  readonly requester?: Requester;
}

const HitCard = ({ hit, requester }: Props) => {
  return <ResourceList.Item {...generateItemProps(hit, requester)} />;
};

export default HitCard;
