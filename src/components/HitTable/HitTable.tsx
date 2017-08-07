import * as React from 'react';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';
import { filterHitsWithoutTO } from '../../utils/turkopticon';

export interface Props {
  readonly hits: HitTableEntry[];
}

export interface Handlers {
  onRefresh: (hits: HitTableEntry[]) => void;
}

class HitTable extends React.PureComponent<Props & Handlers, never> {
  componentWillReceiveProps() {
    this.props.onRefresh(filterHitsWithoutTO(this.props.hits));
  }

  public render() {
    return (
      <ResourceList
        items={this.props.hits}
        renderItem={hit => <HitCard hit={hit} />}
      />
    );
  }
}

export default HitTable;
