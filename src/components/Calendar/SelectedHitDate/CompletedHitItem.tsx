import * as React from 'react';
import { RootState, HitDatabaseEntry } from '../../../types';
import { connect } from 'react-redux';
import { ResourceList } from '@shopify/polaris';
import {
  generateReviewLink,
  generateContactLink
} from '../../../utils/turkopticon';
import { generateHitStatusBadge } from '../../../utils/badges';
import { truncate, formatAsCurrency } from '../../../utils/formatting';
import HitDbEntryCollapsible from './HitDbEntryCollapsible';

export interface OwnProps {
  readonly id: string;
}

export interface Props {
  readonly hit: HitDatabaseEntry;
}

interface State {
  readonly expanded: boolean;
}

class CompletedHitItem extends React.PureComponent<Props & OwnProps, State> {
  state: State = { expanded: false };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.hit.id !== this.props.hit.id) {
      this.setState((): Partial<State> => ({
        expanded: false
      }));
    }
  }

  private generateActions = () => [
    {
      content: 'Edit Bonus'
    },
    {
      content: 'Contact',
      url: generateContactLink(this.props.hit),
      external: true
    },
    {
      content: 'Review',
      url: generateReviewLink(this.props.hit),
      external: true
    }
  ];

  private handleExpand = () => {
    this.setState((prevState: State): Partial<State> => ({
      expanded: !prevState.expanded
    }));
  };

  public render() {
    const { hit: { title, reward, status } } = this.props;
    return (
      <div>
        <div onClick={this.handleExpand}>
          <ResourceList.Item
            persistActions
            attributeOne={formatAsCurrency(reward)}
            attributeTwo={truncate(title, 100)}
            badges={[generateHitStatusBadge(status)]}
            actions={this.generateActions()}
          />
        </div>
        <HitDbEntryCollapsible
          open={this.state.expanded}
          hit={this.props.hit}
        />
      </div>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.hitDatabase.get(ownProps.id)
});

export default connect(mapState)(CompletedHitItem);
