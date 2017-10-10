import * as React from 'react';
import { RootState, HitDatabaseEntry } from '../../../types';
import { connect, Dispatch } from 'react-redux';
import { EditBonus, editBonus } from '../../../actions/bonus';
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

export interface Handlers {
  readonly onEditBonus: (id: string, value: number) => void;
}

class CompletedHitItem extends React.PureComponent<
  Props & OwnProps & Handlers,
  State
> {
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
          <HitDbEntryCollapsible
            open={this.state.expanded}
            hit={this.props.hit}
          />
        </div>
      </div>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.hitDatabase.get(ownProps.id)
});

const mapDispatch = (dispatch: Dispatch<EditBonus>): Handlers => ({
  onEditBonus: (id: string, value: number) => dispatch(editBonus(id, value))
});

export default connect(mapState, mapDispatch)(CompletedHitItem);
