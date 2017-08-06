import * as React from 'react';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';
import { filterHitsWithoutTO } from '../../utils/turkopticon';

export interface Props {
  readonly data: HitTableEntry[];
}

export interface Handlers {
  onRefresh: (hits: HitTableEntry[]) => void;
}

class HitTable extends React.PureComponent<Props & Handlers, never> {
  componentWillReceiveProps() {
    this.props.onRefresh(filterHitsWithoutTO(this.props.data));
  }

  public render() {
    return (
      <ResourceList
        items={this.props.data}
        renderItem={hit => <HitCard data={hit} />}
      />
    );
  }
}

export default HitTable;
