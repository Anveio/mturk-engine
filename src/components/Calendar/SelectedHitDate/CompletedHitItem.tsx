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

export interface OwnProps {
  readonly id: string;
}

export interface Props {
  readonly hit: HitDatabaseEntry;
}

export interface Handlers {
  readonly onEditBonus: (id: string, value: number) => void;
}

class CompletedHitItem extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private generateActions = () => [
    {
      content: 'Edit Bonus',
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

  public render() {
    const { hit: { title, reward, status } } = this.props;
    return (
      <ResourceList.Item
        persistActions
        attributeOne={formatAsCurrency(reward)}
        attributeTwo={truncate(title, 100)}
        badges={[ generateHitStatusBadge(status) ]}
        actions={this.generateActions()}
      />
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
