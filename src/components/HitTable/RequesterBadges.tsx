import * as React from 'react';
import { Badge } from '@shopify/polaris';
import { Requester } from '../../types';
import { calculateAllBadges } from '../../utils/badges';

const BadgeList = (requester: Requester) => {
  return (
    <div>
      {calculateAllBadges(requester).map((badge, index) => (
        <Badge status={badge.status} key={index}>
          {badge.content}
        </Badge>
      ))}
    </div>
  );
};

export default BadgeList;
