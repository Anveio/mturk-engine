import * as React from 'react';
import { SearchResult, BlockedHit, BlockedRequester } from '../../../types';
import { ResourceList } from '@shopify/polaris';
import InfoContainer from './InfoContainer';
import CollapsibleInfo from './CollapsibleInfo';

import { truncate } from '../../../utils/formatting';
import { qualException } from '../../../utils/exceptions';
import { generateBadges } from '../../../utils/badges';
import {
  blockedHitFactory,
  blockedRequesterFactory
} from '../../../utils/blocklist';

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
  readonly onBlockRequester: (requester: BlockedRequester) => void;
}

class SearchCard extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  static infoIcon = (active: boolean) => {
    return active ? 'caretUp' : 'caretDown';
  };

  static infoText = (active: boolean) => {
    return active ? 'Show Less' : 'Show More';
  };

  private handleAccept = () => this.props.onAccept(this.props.hit);
  private handleHide = () =>
    this.props.onHide(blockedHitFactory(this.props.hit));
  private handleExpand = () => this.props.onToggleExpand(this.props.hit);

  private handleBlockRequester = () => {
    this.props.onBlockRequester(
      blockedRequesterFactory(this.props.hit.requester)
    );
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
              <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />
            }
          />
        </div>
        <CollapsibleInfo
          open={!!hit.expanded}
          hit={this.props.hit}
          onBlockRequester={this.handleBlockRequester}
        />
      </div>
    );
  }
}

export default SearchCard;
