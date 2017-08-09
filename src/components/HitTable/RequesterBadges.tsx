import * as React from 'react';
import { Badge } from '@shopify/polaris';
import { Requester } from '../../types';
// import { analyzeRequester } from '../../utils/badges';

const BadgeList = (requester: Requester) => {
  return <Badge status="success">High T.O.</Badge>;
};

export default BadgeList;
