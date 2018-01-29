import * as React from 'react';
import { List as ImmutableList } from 'immutable';
import { HitDatabaseEntry } from '../../types';
import { List } from '@shopify/polaris';
import SubmittedHit from './SubmittedHit';

interface Props {
  readonly hits: ImmutableList<HitDatabaseEntry>;
  readonly numbered?: boolean;
}

const SubmittedHitsCaptionedList: React.SFC<Props> = ({
  hits,
  numbered = false
}) => (
  <List type={numbered ? 'number' : 'bullet'}>
    {hits.map((hit: HitDatabaseEntry) => (
      <SubmittedHit hit={hit} key={hit.id} />
    ))}
  </List>
);

export default SubmittedHitsCaptionedList;
