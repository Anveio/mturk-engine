import * as React from 'react';
import { Hit } from '../../types';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';
import { filterHitsWithoutTO } from '../../utils/turkopticon';

export interface Props {
  readonly hits: Hit[];
}

export interface Handlers {
  onRefresh: (hits: Hit[]) => void;
}

class HitTable extends React.PureComponent<Props & Handlers, never> {
  componentWillReceiveProps() {
    this.props.onRefresh(filterHitsWithoutTO(this.props.hits));
  }

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
