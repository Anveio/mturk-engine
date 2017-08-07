import * as React from 'react';
import { Badge } from '@shopify/polaris';

interface Props {
  requester: string;
}

const BadgeList = ({ requester }: Props) => {
  return <Badge status="success">High T.O.</Badge>;
};

export default BadgeList;
