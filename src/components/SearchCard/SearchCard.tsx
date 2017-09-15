import * as React from 'react';
import { SearchResult, BlockedHit } from '../../types';
import { ResourceList } from '@shopify/polaris';
import InfoContainer from './InfoContainer';
import CollapsibleInfo from './CollapsibleInfo';

import { truncate } from '../../utils/formatting';
import { qualException } from '../../utils/exceptions';
import { generateBadges } from '../../utils/badges';
import { blockedHitFactory } from '../../utils/blocklist';
import { clickDidNotOccurOnActionButton } from '../../utils/searchCard';

export interface Props {
  readonly hit: SearchResult;
}

export interface OwnProps {
  readonly groupId: string;
}

export interface Handlers {
  readonly onAccept: (hit: SearchResult) => void;
  readonly onToggleExpand: (hit: SearchResult) => void;
  readonly onHide: (hit: BlockedHit) => void;
}

class SearchCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private handleAccept = () => this.props.onAccept(this.props.hit);
  private handleHide = () =>
    this.props.onHide(blockedHitFactory(this.props.hit));
  private handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickDidNotOccurOnActionButton(e)) {
      this.props.onToggleExpand(this.props.hit);
    }
  };

  private generateActions = () => [
    {
      content: 'Hide',
      accessibilityLabel: 'Hide',
      icon: 'disable',
      onClick: this.handleHide
    },
    {
      content: 'Add',
      accessibilityLabel: 'Add',
      icon: 'add',
      primary: true,
      onClick: this.handleAccept
    }
  ];

  public render() {
    const { hit } = this.props;
    const { qualified, title, requester } = hit;
    return (
      <div>
        <div onClick={this.handleExpand}>
          <ResourceList.Item
            actions={this.generateActions()}
            exceptions={qualException(qualified)}
            badges={generateBadges(requester.turkopticon)}
            attributeOne={truncate(requester.name, 40)}
            attributeTwo={truncate(title, 80)}
            attributeThree={
              <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />}
          />
        </div>
        <CollapsibleInfo open={!!hit.expanded} hit={this.props.hit} />
      </div>
    );
  }
}

export default SearchCard;
