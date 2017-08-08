import * as React from 'react';
import { Hit } from '../../types';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';

export interface Props {
  readonly hits: Hit[];
}

class HitTable extends React.PureComponent<Props, never> {
  public render() {
    return (
      <ResourceList
        items={this.props.hits}
        renderItem={(hit: Hit) => <HitCard hit={hit} requester={hit.turkopticon} />}
      />
    );
  }
}

export default HitTable;
