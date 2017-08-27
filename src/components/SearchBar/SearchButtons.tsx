import * as React from 'react';
import { Stack, ButtonGroup, Button } from '@shopify/polaris';
import TimeLastSearch from './TimeLastSearch';

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
    <Stack vertical={false} alignment="baseline">
      <ButtonGroup segmented>
        <Button primary icon="search" onClick={onSearch}>
          Search HITs
        </Button>
        <Button onClick={onToggle}>{buttonText(active)}</Button>
      </ButtonGroup>
      <TimeLastSearch />
    </Stack>
  );
};

export default SearchButtons;
