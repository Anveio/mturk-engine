import * as React from 'react';
// import { DisableableAction } from '@shopify/polaris/types/';
import { SearchItem, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import InfoContainer from './InfoContainer';
// import { actions } from '../../utils/hitItem';
import { truncate } from '../../utils/formatting';
import { generateBadges } from '../../utils/badges';

export interface Props {
  readonly hit: SearchItem;
  readonly requester?: Requester;
  readonly onClick: (groupId: string) => void;
}

const SearchCard = ({ hit, requester, onClick }: Props) => {
  const { requesterName, title } = hit;
  const handleClick = () => onClick(hit.groupId);

  const actions = [
    {
      primary: true,
      content: 'Accept',
      accessibilityLabel: 'Accept',
      icon: 'add',
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
