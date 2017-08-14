import * as React from 'react';
import { Hit, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import { calculateAllBadges } from '../../utils/badges';
import { truncate } from '../../utils/formatting';

export interface Props {
  readonly hit: Hit;
  readonly requester?: Requester;
}

const HitCard = ({ hit, requester }: Props) => {
  const { requesterName, reward, groupId, title } = hit;
  const badges = requester ? calculateAllBadges(requester) : [];
  const actions = [
    {
      content: 'Preview',
      external: true,
      url: `https://www.mturk.com/mturk/preview?groupId=${groupId}`
    },
    {
      content: 'Accept',
      primary: true,
      external: true,
      url: `https://www.mturk.com/mturk/previewandaccept?groupId=${groupId}`
    }
  ];

  const itemProps = {
    attributeOne: truncate(title, 80),
    attributeTwo: truncate(requesterName, 45),
    attributeThree: reward,
    badges,
    actions
  };

  return hit.groupId.startsWith('[Error:groupId]-') ? (
    <ResourceList.Item
      {...itemProps}
      exceptions={[ { status: 'warning', title: 'You are not qualified.' } ]}
    />
  ) : (
    <ResourceList.Item {...itemProps} />
  );
};

export default HitCard;
