import * as React from 'react';
import { Link } from '@shopify/polaris';
import { Hit, Requester } from '../types';
import { generateBadges } from './badges';
import { truncate } from './formatting';
import { tutkopticonBaseUrl } from '../constants';

type ExceptionStatus = 'neutral' | 'warning' | 'critical';
export interface ExceptionDescriptor {
  status?: ExceptionStatus;
  title?: string;
  description?: string;
}

const generateExceptions = (groupId: string): ExceptionDescriptor[] => {
  return groupId.startsWith('[Error:groupId]-')
    ? [ { status: 'warning', title: 'You are not qualified.' } ]
    : [];
};

export const requesterButton = (requester: Requester | string, id: string) => {
  const textNoTO = (name: string) => {
    return <p>{truncate(name, 45)}</p>;
  };

  const buttonTO = (props: Requester) => {
    const { name } = props;

    return (
      <Link url={tutkopticonBaseUrl + id} external>
        {`${truncate(name, 45)}`}
      </Link>
    );
  };

  return typeof requester === 'string' ? textNoTO(requester) : buttonTO(requester);
};

export const generateItemProps = (hit: Hit, requester: Requester | undefined) => {
  const { requesterName, reward, groupId, title } = hit;

  const actions = [
    {
      icon: 'view',
      external: true,
      url: `https://www.mturk.com/mturk/preview?groupId=${groupId}`
    },
    {
      primary: true,
      external: true,
      icon: 'add',
      url: `https://www.mturk.com/mturk/previewandaccept?groupId=${groupId}`
    }
  ];

  return {
    attributeOne: requesterName,
    attributeTwo: truncate(title, 80),
    // attributeThree: requesterButton(requester || requesterName, requesterId),
    attributeThree: `$${reward}`,
    badges: generateBadges(requester),
    actions,
    exceptions: generateExceptions(groupId)
  };
};
