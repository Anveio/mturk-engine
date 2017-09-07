import * as React from 'react';
import { SearchResult, BlockedHit, TOpticonData } from '../../../types';
import { ResourceList } from '@shopify/polaris';
import InfoContainer from './InfoContainer';
import CollapsibleInfo from './CollapsibleInfo';
import { truncate } from '../../../utils/formatting';
import { qualException } from '../../../utils/exceptions';
import { generateBadges } from '../../../utils/badges';
import { blockedHitFactory } from '../../../utils/blockHit';

export interface Props {
  readonly hit: SearchResult;
  readonly requester?: TOpticonData;
}

export interface Handlers {
  readonly onAccept: (hit: SearchResult) => void;
  readonly onToggleExpand: (hit: SearchResult) => void;
  readonly onHide: (hit: BlockedHit) => void;
}

class SearchCard extends React.PureComponent<Props & Handlers, never> {
  static infoIcon = (active: boolean) => {
    return active ? 'caretUp' : 'caretDown';
  };

  static infoText = (active: boolean) => {
    return active ? 'Show Less' : 'Show More';
  };

  private handleAccept = () => this.props.onAccept(this.props.hit);
  private handleHide = () =>
    this.props.onHide(blockedHitFactory(this.props.hit));
  private handleExpand = () => {
    this.props.onToggleExpand(this.props.hit);
  };

  private generateActions = () => [
    {
      content: 'Hide',
      accessibilityLabel: 'Hide',
      icon: 'disable',
      destructive: true,
      onClick: this.handleHide
    },
    {
      content: SearchCard.infoText(!!this.props.hit.expanded),
      onClick: this.handleExpand,
      icon: SearchCard.infoIcon(!!this.props.hit.expanded)
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
    const { hit, requester } = this.props;
    const { qualified, requesterName, title } = hit;
    return (
      <div>
        <ResourceList.Item
          actions={this.generateActions()}
          exceptions={qualException(qualified)}
          badges={generateBadges(requester)}
          attributeOne={truncate(requesterName, 40)}
          attributeTwo={truncate(title, 80)}
          attributeThree={
            <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />}
        />
        <CollapsibleInfo open={!!hit.expanded} hit={this.props.hit} />
      </div>
    );
  }
}

export default SearchCard;
