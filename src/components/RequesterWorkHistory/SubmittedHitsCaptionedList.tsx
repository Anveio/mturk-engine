import * as React from 'react';
import { List as ImmutableList } from 'immutable';
import { HitDatabaseEntry } from '../../types';
import { List } from '@shopify/polaris';
import SubmittedHit from './SubmittedHit';

interface Props {
  readonly hits: ImmutableList<HitDatabaseEntry>;
}

class SubmittedHitsCaptionedList extends React.PureComponent<Props, never> {
  public render() {
    const { hits } = this.props;
    return (
      <List>
        {hits.map((hit: HitDatabaseEntry) => (
          <SubmittedHit hit={hit} key={hit.id} />
        ))}
      </List>
    );
  }
}

export default SubmittedHitsCaptionedList;
