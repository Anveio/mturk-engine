import * as React from 'react';
// import { DisableableAction } from '@shopify/polaris/types/';
import { SearchResult, BlockedHit, Requester } from '../../types';
import { ResourceList } from '@shopify/polaris';
import InfoContainer from './InfoContainer';
import CollapsibleInfo from './CollapsibleInfo';
import { truncate } from '../../utils/formatting';
import { qualException } from '../../utils/exceptions';
import { generateBadges } from '../../utils/badges';
import { blockedHitFactory } from '../../utils/blockHit';

export interface Props {
  readonly hit: SearchResult;
  readonly requester?: Requester;
  readonly onAccept: (hit: SearchResult) => void;
  readonly onHide: (hit: BlockedHit) => void;
}

export interface State {
  active: boolean;
}

class SearchCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { active: false };
  }

  componentWillReceiveProps() {
    this.setState((): Partial<State> => ({ active: false }));
  }

  private handleAccept = () => this.props.onAccept(this.props.hit);
  private handleHide = () =>
    this.props.onHide(blockedHitFactory(this.props.hit));

  private onToggleFocus = () =>
    this.setState((prevState: Partial<State>): Partial<State> => ({
      active: !prevState.active
    }));

  private actions = [
    {
      content: 'Hide',
      accessibilityLabel: 'Hide',
      icon: 'disable',
      destructive: true,
      onClick: this.handleHide
    },
    {
      content: 'Accept',
      accessibilityLabel: 'Accept',
      icon: 'external',
      external: true,
      url: `https://www.mturk.com/mturk/previewandaccept?groupId=${this.props
        .hit.groupId}`
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
      <div onClick={this.onToggleFocus}>
        <ResourceList.Item
          actions={this.actions}
          exceptions={qualException(qualified)}
          badges={generateBadges(requester)}
          attributeOne={truncate(requesterName, 40)}
          attributeTwo={truncate(title, 80)}
          attributeThree={
            <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />}
        />
        <CollapsibleInfo
          open={this.state.active}
          description={this.props.hit.description}
          timeAllotted={this.props.hit.timeAllotted}
        />
      </div>
    );
  }
}

export default SearchCard;
