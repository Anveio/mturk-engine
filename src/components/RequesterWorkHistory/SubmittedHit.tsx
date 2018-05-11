import * as React from 'react';
import { List, Badge, Caption } from '@shopify/polaris';
import { formatAsUsd } from 'utils/formatting';
import { stringToDate } from 'utils/dates';
import { HitDatabaseEntry } from 'types';
import { generateHitStatusBadge } from 'utils/badges';
import { LEGACY_DATE_FORMAT } from 'constants/dates';

interface Props {
  readonly hit: HitDatabaseEntry;
}
const SubmittedHit: React.SFC<Props> = ({ hit }) => {
  const { status, content } = generateHitStatusBadge(hit.status);
  return (
    <List.Item key={hit.id}>
      {hit.title}
      <Badge status={status}>{content}</Badge>
      <Caption>{`${formatAsUsd(hit.reward)} - Submitted ${stringToDate(
        hit.date
      )(LEGACY_DATE_FORMAT).toLocaleDateString()}`}</Caption>
    </List.Item>
  );
};

export default SubmittedHit;
