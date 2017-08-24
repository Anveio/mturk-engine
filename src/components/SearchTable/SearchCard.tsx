import * as React from 'react';
// import { DisableableAction } from '@shopify/polaris/types/';
import { SearchItem, BlockedHit, TOpticonResponse } from '../../types';
import { ResourceList } from '@shopify/polaris';
import InfoContainer from './InfoContainer';
import { truncate } from '../../utils/formatting';
import { qualException } from '../../utils/exceptions';
import { generateBadges } from '../../utils/badges';
import { searchItemToBlockedHit } from '../../utils/blockHit';

export interface Props {
  readonly hit: SearchItem;
  readonly requester?: TOpticonResponse;
  readonly onClick: (hit: SearchItem) => void;
  readonly onHide: (hit: BlockedHit) => void;
}

const SearchCard = ({ hit, requester, onClick, onHide }: Props) => {
  const { requesterName, groupId, title, qualified } = hit;
  const handleAccept = () => onClick(hit);
  const handleHide = () => onHide(searchItemToBlockedHit(hit));

  const actions = [
    {
      content: 'Hide',
      accessibilityLabel: 'Hide',
      icon: 'disable',
      destructive: true,
      onClick: handleHide
    },
    {
      content: 'Preview',
      accessibilityLabel: 'Preview',
      icon: 'external',
      external: true,
      url: `https://www.mturk.com/mturk/preview?groupId=${groupId}`
    },
    {
      content: 'Accept',
      accessibilityLabel: 'Accept',
      icon: 'external',
      external: true,
      url: `https://www.mturk.com/mturk/previewandaccept?groupId=${groupId}`
    },
    {
      content: 'Add',
      accessibilityLabel: 'Add',
      icon: 'add',
      primary: true,
      onClick: handleAccept
    }
  ];

  return (
    <ResourceList.Item
      actions={actions}
      exceptions={qualException(qualified)}
      badges={generateBadges(requester)}
      attributeOne={truncate(requesterName, 40)}
      attributeTwo={truncate(title, 80)}
      attributeThree={
        <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />}
    />
  );
};

export default SearchCard;
