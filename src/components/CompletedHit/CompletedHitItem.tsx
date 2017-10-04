import * as React from 'react';
import { RootState, HitDatabaseEntry } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { EditBonus, editBonus } from '../../actions/bonus';
import { ResourceList } from '@shopify/polaris';
import { generateReviewLink } from '../../utils/turkopticon';

export interface OwnProps {
  readonly id: string;
}

export interface Props {
  readonly hit: HitDatabaseEntry;
}

export interface Handlers {
  readonly onEdit: (id: string, value: number) => void;
}

class CompletedHitItem extends React.PureComponent<
  Props & OwnProps & Handlers,
  never
> {
  private generateActions = () => [
    {
      content: 'Leave Review',
      url: generateReviewLink(this.props.hit),
      external: true
    }
  ];

  public render() {
    const { hit } = this.props;
    return (
      <ResourceList.Item
        persistActions
        attributeOne={hit.title}
        actions={this.generateActions()}
      />
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.hitDatabase.get(ownProps.id)
});

const mapDispatch = (dispatch: Dispatch<EditBonus>): Handlers => ({
  onEdit: (id: string, value: number) => dispatch(editBonus(id, value))
});

export default connect(mapState, mapDispatch)(CompletedHitItem);
