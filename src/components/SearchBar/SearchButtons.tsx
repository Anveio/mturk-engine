import * as React from 'react';
import { SearchOptions } from '../../types';
import { Stack, ButtonGroup, Button } from '@shopify/polaris';
import TimeLastSearch from './TimeLastSearch';

export interface Props {
  readonly options: SearchOptions;
  readonly settingsActive: boolean;
  readonly searchActive: boolean;
}

export interface Handlers {
  readonly onToggle: () => void;
  readonly onSearch: (options: SearchOptions) => void;
}

const settingsButtonText = (active: boolean) => {
  return active ? 'Hide search settings' : 'Edit search settings';
};

const searchButtonText = (active: boolean) => {
  return active ? 'Stop searching' : 'Start searching';
};

const SearchButtons = (props: Props & Handlers) => {
  const { options, onSearch, onToggle, settingsActive, searchActive } = props;

  const handleSearch = () => {
    onSearch(options);
  };

  return (
    <Stack vertical={false} alignment="baseline">
      <ButtonGroup segmented>
        <Button primary icon="search" onClick={handleSearch}>
          {searchButtonText(searchActive)}
        </Button>
        <Button onClick={onToggle}>{settingsButtonText(settingsActive)}</Button>
      </ButtonGroup>
      <TimeLastSearch />
    </Stack>
  );
};

export default SearchButtons;
