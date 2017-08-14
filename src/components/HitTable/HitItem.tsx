import * as React from 'react';
import { Hit, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import { generateItemProps } from '../../utils/hitItem';

export interface Props {
  readonly hit: Hit;
  readonly requester?: Requester;
}

const HitCard = ({ hit, requester }: Props) => {
  return hit.groupId.startsWith('[Error:groupId]-') ? (
    <ResourceList.Item
      {...generateItemProps(hit, requester)}
      exceptions={[ { status: 'warning', title: 'You are not qualified.' } ]}
    />
  ) : (
    <ResourceList.Item {...generateItemProps(hit, requester)} />
  );
};

export default HitCard;
