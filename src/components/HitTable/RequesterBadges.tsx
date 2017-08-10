import * as React from 'react';
import { Badge } from '@shopify/polaris';
import { Requester } from '../../types';
import { analyzeRequester } from '../../utils/badges';

const BadgeList = (requester: Requester) => {
  return (
    <div>
      {analyzeRequester(requester).map((badge, index) => (
        <Badge status={badge.status} key={index}>
          {badge.text}
        </Badge>
      ))}
    </div>
  );
};

export default BadgeList;
