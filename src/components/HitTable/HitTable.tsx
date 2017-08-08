import * as React from 'react';
import { HitTableEntry, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';
import { Map } from 'immutable';
import { filterHitsWithoutTO } from '../../utils/turkopticon';

export interface Props {
  readonly hits: HitTableEntry[];
  readonly requesters: Map<string, Requester>;
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
        renderItem={(hit: HitTableEntry) => (
          <HitCard hit={hit} requester={hit.turkopticon} />
        )}
      />
    );
  }
}

export default HitTable;
