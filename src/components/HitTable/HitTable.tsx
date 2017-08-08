import * as React from 'react';
import { Hit, HitSet } from '../../types';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';

export interface Props {
  readonly hits: HitSet;
}

class HitTable extends React.PureComponent<Props, never> {
  public render() {
    return (
      <ResourceList
        items={this.props.hits.toArray()}
        renderItem={(hit: Hit) => <HitCard hit={hit} requester={hit.turkopticon} />}
      />
    );
  }
}

export default HitTable;
