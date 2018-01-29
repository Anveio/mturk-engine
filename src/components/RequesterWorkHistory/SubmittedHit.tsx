import * as React from 'react';
import { List, Badge, Caption } from '@shopify/polaris';
import { formatAsCurrency } from '../../utils/formatting';
import { stringToDate } from '../../utils/dates';
import { LEGACY_DATE_FORMAT } from '../../constants/misc';
import { HitDatabaseEntry } from '../../types';
import { generateHitStatusBadge } from '../../utils/badges';

interface Props {
  readonly hit: HitDatabaseEntry;
}
const SubmittedHit: React.SFC<Props> = ({ hit }) => (
  <List.Item key={hit.id}>
    {hit.title}

    <Badge status={generateHitStatusBadge(hit.status).status}>
      {generateHitStatusBadge(hit.status).content}
    </Badge>
    <Caption>{`${formatAsCurrency(hit.reward)} - Submitted ${stringToDate(
      hit.date
    )(LEGACY_DATE_FORMAT).toLocaleDateString()}`}</Caption>
  </List.Item>
);

export default SubmittedHit;
