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
  static generateAttributeOne = (name: string, markedAsRead?: boolean) =>
    markedAsRead ? truncate(name, 40) : `*NEW* ${truncate(name, 40)}`;

  static generateStyle = (markedAsRead?: boolean) =>
    markedAsRead ? {} : { backgroundColor: 'rgba(72, 175, 240, 0.1)' };

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
    const { qualified, title, requester, markedAsRead } = hit;

    return (
      <div>
        <div
          onClick={this.handleExpand}
          style={SearchCard.generateStyle(markedAsRead)}
        >
          <ResourceList.Item
            actions={this.generateActions()}
            exceptions={qualException(qualified)}
            badges={generateBadges(requester.turkopticon)}
            attributeOne={SearchCard.generateAttributeOne(
              requester.name,
              markedAsRead
            )}
            attributeTwo={truncate(title, 120)}
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
