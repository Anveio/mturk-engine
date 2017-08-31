import * as React from 'react';
import { Stack, ButtonGroup, Button } from '@shopify/polaris';
import TimeLastSearch from './TimeLastSearch';

interface Props {
  readonly onToggle: () => void;
  readonly onSearch: () => void;
  readonly settingsActive: boolean;
  readonly searchActive: boolean;
}

const settingsButtonText = (active: boolean) => {
  return active ? 'Hide search settings' : 'Edit search settings';
};

const searchButtonText = (active: boolean) => {
  return active ? 'Stop searching' : 'Start searching';
};

const SearchButtons = (props: Props) => {
  const { onSearch, onToggle, settingsActive, searchActive } = props;
  return (
    <Stack vertical={false} alignment="baseline">
      <ButtonGroup segmented>
        <Button primary icon="search" onClick={onSearch}>
          {searchButtonText(searchActive)}
        </Button>
        <Button onClick={onToggle}>{settingsButtonText(settingsActive)}</Button>
      </ButtonGroup>
      <TimeLastSearch />
    </Stack>
  );
};

export default SearchButtons;
