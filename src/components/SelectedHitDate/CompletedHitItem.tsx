import * as React from 'react';
import { RootState, HitDatabaseEntry, WorkerHitDatabaseEntry } from 'types';
import { connect } from 'react-redux';
import { ResourceList } from '@shopify/polaris';
import { generateReviewLink } from 'utils/turkopticon';
import { generateHitStatusBadge } from 'utils/badges';
import { truncate, formatAsUsd } from 'utils/formatting';
import HitDbEntryCollapsible from './HitDbEntryCollapsible';
import { generateContactLink } from 'utils/urls';

interface OwnProps {
  readonly id: string;
}

interface Props {
  readonly hit: HitDatabaseEntry;
}

interface State {
  readonly expanded: boolean;
}

class CompletedHitItem extends React.PureComponent<Props & OwnProps, State> {
  public readonly state: State = { expanded: false };

  componentDidUpdate(nextProps: Props) {
    if (nextProps.hit.id !== this.props.hit.id) {
      this.setState(() => ({
        expanded: false
      }));
    }
  }

  private static displayEarnings = (reward: number, bonus: number) =>
    bonus > 0
      ? `${formatAsUsd(reward)} + ${formatAsUsd(bonus)}`
      : `${formatAsUsd(reward)}`;

  private generateActions = (assignmentId?: string) => [
    {
      content: 'Contact',
      url: assignmentId
        ? generateContactLink(this.props.hit as WorkerHitDatabaseEntry)
        : undefined,
      external: true,
      disabled: this.props.hit.assignmentId ? false : true
    },
    {
      content: 'Review',
      url: generateReviewLink(this.props.hit),
      external: true
    }
  ];

  private handleExpand = () => {
    this.setState((prevState: State) => ({
      expanded: !prevState.expanded
    }));
  };

  public render() {
    const {
      hit: { title, requester, reward, bonus, status, assignmentId }
    } = this.props;
    return (
      <React.Fragment>
        <div onClick={this.handleExpand}>
          <ResourceList.Item
            attributeOne={CompletedHitItem.displayEarnings(reward, bonus)}
            attributeTwo={truncate(title, 100)}
            attributeThree={truncate(requester.name, 30)}
            badges={[generateHitStatusBadge(status)]}
            actions={this.generateActions(assignmentId)}
          />
        </div>
        <HitDbEntryCollapsible
          open={this.state.expanded}
          hit={this.props.hit}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.hitDatabase.get(ownProps.id)
});

export default connect(mapState)(CompletedHitItem);
