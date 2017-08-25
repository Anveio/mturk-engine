import * as React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';

interface Props {
  readonly onToggle: () => void;
  readonly onSearch: () => void;
  readonly active: boolean;
}

const buttonText = (active: boolean) => {
  return active ? 'Hide search settings' : 'Edit search settings';
};

const SearchButtons = ({ onSearch, onToggle, active }: Props) => {
  return (
    <ButtonGroup segmented>
      <Button primary icon="search" onClick={onSearch}>
        Search HITs
      </Button>
      <Button onClick={onToggle}>{buttonText(active)}</Button>
    </ButtonGroup>
  );
};

export default SearchButtons;
