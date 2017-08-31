import * as React from 'react';
import { Stack, ButtonGroup, Button } from '@shopify/polaris';
import TimeLastSearch from './TimeLastSearch';

export interface Props {
  readonly settingsActive: boolean;
  readonly searchActive: boolean;
}

export interface Handlers {
  readonly onToggleSettings: () => void;
  readonly onToggleSearch: (active: boolean) => void;
}

const settingsButtonText = (active: boolean) => {
  return active ? 'Hide search settings' : 'Edit search settings';
};

const searchButtonText = (active: boolean) => {
  return active ? 'Stop searching' : 'Start searching';
};

const SearchButtons = (props: Props & Handlers) => {
  const {
    onToggleSearch,
    onToggleSettings,
    settingsActive,
    searchActive
  } = props;

  const handleSearch = () => {
    onToggleSearch(searchActive);
  };

  return (
    <Stack vertical={false} alignment="baseline">
      <ButtonGroup segmented>
        <Button
          primary
          icon="search"
          onClick={handleSearch}
          destructive={searchActive}
        >
          {searchButtonText(searchActive)}
        </Button>
        <Button onClick={onToggleSettings}>
          {settingsButtonText(settingsActive)}
        </Button>
      </ButtonGroup>
      <TimeLastSearch />
    </Stack>
  );
};

export default SearchButtons;
