import * as React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';

interface Props {
  readonly onToggle: () => void;
  readonly onFetch: () => void;
  readonly active: boolean;
}

const buttonText = (active: boolean) => {
  return active ? 'Hide search settings' : 'Edit search settings';
};

const SearchButtons = ({ onFetch, onToggle, active }: Props) => {
  return (
    <ButtonGroup>
      <Button primary onClick={onFetch}>
        Search HITs
      </Button>
      <Button onClick={onToggle}>{buttonText(active)}</Button>
    </ButtonGroup>
  );
};

export default SearchButtons;
