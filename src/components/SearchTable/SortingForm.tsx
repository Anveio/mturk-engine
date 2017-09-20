import * as React from 'react';
import { Button } from '@shopify/polaris';
import {
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Position
} from '@blueprintjs/core';
import { SortingOption } from '../../types';

export interface Props {
  readonly value: SortingOption;
}

export interface Handlers {
  readonly onChange: (option: SortingOption) => void;
}

class SortingForm extends React.PureComponent<Props & Handlers, never> {
  public render() {
    const { value } = this.props;
    return (
      <Popover position={Position.BOTTOM_RIGHT}>
        <Button plain disclosure>
          {`Sorted By: ${value}`}
        </Button>
        <Menu>
          <MenuDivider title="Sorting Options" />
          <MenuItem
            iconName="time"
            onClick={() => this.props.onChange('Latest')}
            text="Latest"
          />
          <MenuItem
            iconName="dollar"
            onClick={() => this.props.onChange('Reward')}
            text="Reward"
          />
          <MenuItem
            iconName="pt-icon-sort-numerical-desc"
            onClick={() => this.props.onChange('Batch Size')}
            text="Batch Size"
          />
        </Menu>
      </Popover>
    );
  }
}

export default SortingForm;
