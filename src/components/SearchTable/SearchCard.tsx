import * as React from 'react';
// import { DisableableAction } from '@shopify/polaris/types/';
import { SearchItem, BlockedHit, Requester } from '../../types';
import { ResourceList, Collapsible, Card } from '@shopify/polaris';
import InfoContainer from './InfoContainer';
import { truncate } from '../../utils/formatting';
import { qualException } from '../../utils/exceptions';
import { generateBadges } from '../../utils/badges';
import { blockedHitFactory } from '../../utils/blockHit';

export interface Props {
  readonly hit: SearchItem;
  readonly requester?: Requester;
  readonly onAccept: (hit: SearchItem) => void;
  readonly onHide: (hit: BlockedHit) => void;
}

// const SearchCard = ({ hit, requester, onAccept, onHide }: Props) => {
//   const { requesterName, groupId, title, qualified } = hit;
//   const handleAccept = () => onAccept(hit);
//   const handleHide = () => onHide(searchItemToBlockedHit(hit));

//   const actions = [
//     {
//       content: 'Hide',
//       accessibilityLabel: 'Hide',
//       icon: 'disable',
//       destructive: true,
//       onClick: handleHide
//     },
//     {
//       content: 'Preview',
//       accessibilityLabel: 'Preview',
//       icon: 'external',
//       external: true,
//       url: `https://www.mturk.com/mturk/preview?groupId=${groupId}`
//     },
//     {
//       content: 'Accept',
//       accessibilityLabel: 'Accept',
//       icon: 'external',
//       external: true,
//       url: `https://www.mturk.com/mturk/previewandaccept?groupId=${groupId}`
//     },
//     {
//       content: 'Add',
//       accessibilityLabel: 'Add',
//       icon: 'add',
//       primary: true,
//       onClick: handleAccept
//     }
//   ];

//   return (
//       <ResourceList.Item
//         actions={actions}
//         exceptions={qualException(qualified)}
//         badges={generateBadges(requester)}
//         attributeOne={truncate(requesterName, 40)}
//         attributeTwo={truncate(title, 80)}
//         attributeThree={
//           <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />
//         }
//       />
//   );
// };

interface State {
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
      content: 'Preview',
      accessibilityLabel: 'Preview',
      icon: 'external',
      external: true,
      url: `https://www.mturk.com/mturk/preview?groupId=${this.props.hit
        .groupId}`
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

  render() {
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
            <InfoContainer reward={hit.reward} batchSize={hit.batchSize} />
          }
        />
        <Collapsible open={this.state.active}>
          <Card.Section subdued>{hit.timeAllotted}</Card.Section>
        </Collapsible>
      </div>
    );
  }
}

export default SearchCard;
