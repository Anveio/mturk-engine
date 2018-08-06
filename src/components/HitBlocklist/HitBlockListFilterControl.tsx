import * as React from 'react';
import { ResourceList } from '@shopify/polaris';
import { RootState } from 'types';
import { connect } from 'react-redux';
import { updateHitBlocklistSearchTerm } from 'actions/blockHit';

interface Props {
  readonly searchTerm: string;
}

interface Handlers {
  readonly onSearchChange: (value: string) => void;
}

class HitBlockListFilterControl extends React.Component<
  Props & Handlers,
  never
> {
  private clearAllFields = () => {
    this.props.onSearchChange('');
  };

  public render() {
    return (
      <ResourceList.FilterControl
        additionalAction={{
          content: 'Clear',
          onAction: this.clearAllFields
        }}
        searchValue={this.props.searchTerm}
        onSearchChange={this.props.onSearchChange}
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  searchTerm: state.hitBlocklistFilterSettings.searchTerm
});

const mapDispatch: Handlers = {
  onSearchChange: updateHitBlocklistSearchTerm
};

export default connect(
  mapState,
  mapDispatch
)(HitBlockListFilterControl);
