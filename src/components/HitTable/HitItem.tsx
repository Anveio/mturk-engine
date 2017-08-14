import * as React from 'react';
import { Hit, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import UnqualifiedCard from './UnqualifiedCard';
import { calculateAllBadges } from '../../utils/badges';

export interface Props {
  readonly hit: Hit;
  readonly requester?: Requester;
}

const HitCard = ({ hit, requester }: Props) => {
  const { requesterName, reward, title } = hit;
  const badges = requester ? calculateAllBadges(requester) : [];

  const itemProps = {
    attributeOne: title,
    attributeTwo: requesterName,
    attributeThree: reward,
  };

  return hit.groupId.startsWith('[Error:groupId]-') ? (
    <UnqualifiedCard {...hit} />
  ) : (
    <ResourceList.Item
      {...itemProps}
      badges={badges}
    />
  );
};

export default HitCard;
