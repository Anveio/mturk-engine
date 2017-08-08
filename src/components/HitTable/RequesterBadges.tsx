import * as React from 'react';
import { Badge } from '@shopify/polaris';
import { Requester } from '../../types';

interface Props {
  readonly requester?: Requester;
}

const BadgeList = ({ requester }: Props) => {
  return <Badge status="success">High T.O.</Badge>;
};

export default BadgeList;
