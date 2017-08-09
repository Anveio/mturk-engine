import * as React from 'react';
import { Hit, HitMap, RequesterMap } from '../../types';
import { ResourceList } from '@shopify/polaris';
import HitCard from './HitCard';

export interface Props {
  readonly hits: HitMap;
  readonly requesters: RequesterMap;
}

class HitTable extends React.PureComponent<Props, never> {
  public render() {
    return (
      <ResourceList
        items={this.props.hits.toArray()}
        renderItem={(hit: Hit) => (
          <HitCard
            hit={hit}
            requester={this.props.requesters.get(hit.requesterId)}
          />
        )}
      />
    );
  }
}

export default HitTable;
