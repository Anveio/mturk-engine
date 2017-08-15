import * as React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';

interface Props {
  readonly onToggle: () => void;
  readonly active: boolean;
}

const buttonText = (active: boolean) => {
  return active ? 'Hide search settings' : 'Edit search settings';
};

const SearchButtons = ({ onToggle, active }: Props) => {
  return (
    <ButtonGroup>
      <Button onClick={onToggle}>{buttonText(active)}</Button>
    </ButtonGroup>
  );
};

export default SearchButtons;
