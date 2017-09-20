import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ChangeSorting, changeSorting } from '../../actions/sorting';
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

  public render() {
    const { value } = this.props;
    return (
      <Popover position={Position.BOTTOM_LEFT} canEscapeKeyClose>
        <Button plain disclosure>
          {`Sorted By: ${value}`}
        </Button>
        <Menu>
          <MenuDivider title="Sorting Options" />
          <MenuItem
            shouldDismissPopover={false}
            iconName="time"
            intent={this.generateIntent('Latest')}
            onClick={() => this.props.onChange('Latest')}
            text="Latest"
          />
          <MenuItem
            shouldDismissPopover={false}
            iconName="dollar"
            intent={this.generateIntent('Reward')}
            onClick={() => this.props.onChange('Reward')}
            text="Reward"
          />
          <MenuItem
            shouldDismissPopover={false}
            intent={this.generateIntent('Batch Size')}
            iconName="pt-icon-sort-numerical-desc"
            onClick={() => this.props.onChange('Batch Size')}
            text="Batch Size"
          />
        </Menu>
      </Popover>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<ChangeSorting>): Handlers => ({
  onChange: (option: SortingOption) => {
    dispatch(changeSorting(option));
  }
});

const mapState = (state: RootState): Props => ({
  value: state.sortingOption
});

export default connect(mapState, mapDispatch)(SortingMenu);
