import * as React from 'react';
// import { DisableableAction } from '@shopify/polaris/types/';
import { SearchItem, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import InfoContainer from './InfoContainer';
import { truncate } from '../../utils/formatting';
import { generateBadges } from '../../utils/badges';

export interface Props {
  readonly hit: SearchItem;
  readonly requester?: Requester;
  readonly onClick: (hit: SearchItem) => void;
}

const SearchCard = ({ hit, requester, onClick }: Props) => {
  const { requesterName, groupId, title } = hit;
  const handleClick = () => onClick(hit);

  const actions = [
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
      onClick: handleClick
    }
  ];

  return (
    <ResourceList.Item
      actions={actions}
      badges={generateBadges(requester)}
      attributeOne={truncate(requesterName, 40)}
      attributeTwo={truncate(title, 80)}
      attributeThree={
        <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />}
    />
  );
};

export default SearchCard;
