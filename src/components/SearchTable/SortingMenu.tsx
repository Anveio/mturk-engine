import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ChangeSearchResultSort, changeSorting } from '../../actions/sorting';
import { SortingOption, RootState } from '../../types';
import { Button } from '@shopify/polaris';
import {
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Intent,
  Position
} from '@blueprintjs/core';

export interface Props {
  readonly value: SortingOption;
}

export interface Handlers {
  readonly onChange: (option: SortingOption) => void;
}

class SortingMenu extends React.PureComponent<Props & Handlers, never> {
  private generateIntent = (option: SortingOption): Intent => {
    return option !== this.props.value ? 0 : -1;
  };

  private handleChange = (option: SortingOption) => () =>
    this.props.onChange(option);

  public render() {
    const { value } = this.props;
    return (
      <Popover position={Position.BOTTOM_RIGHT} canEscapeKeyClose>
        <Button plain disclosure>
          {`Sorted By: ${value}`}
        </Button>
        <Menu>
          <MenuDivider title="Sorting Options" />
          <MenuItem
            shouldDismissPopover={false}
            iconName="time"
            intent={this.generateIntent('Latest')}
            onClick={this.handleChange('Latest')}
            text="Latest"
          />
          <MenuItem
            shouldDismissPopover={false}
            iconName="pt-icon-series-derived"
            intent={this.generateIntent('Weighted T.O.')}
            onClick={this.handleChange('Weighted T.O.')}
            text="Weighted T.O."
          />
          <MenuItem
            shouldDismissPopover={false}
            iconName="dollar"
            intent={this.generateIntent('Reward')}
            onClick={this.handleChange('Reward')}
            text="Reward"
          />
          <MenuItem
            shouldDismissPopover={false}
            intent={this.generateIntent('Batch Size')}
            iconName="pt-icon-sort-numerical-desc"
            onClick={this.handleChange('Batch Size')}
            text="Batch Size"
          />
        </Menu>
      </Popover>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ChangeSearchResultSort>): Handlers => ({
  onChange: (option: SortingOption) => {
    dispatch(changeSorting(option));
  }
});

const mapState = (state: RootState): Props => ({
  value: state.sortingOption
});

export default connect(mapState, mapDispatch)(SortingMenu);
