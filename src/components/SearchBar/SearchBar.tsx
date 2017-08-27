import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import { SearchOptions } from '../../types';
import SearchSettings from '../../containers/SearchSettings';
import SearchButtons from './SearchButtons';

export interface Handlers {
  readonly onToggle: () => void;
  readonly onSearch: (options: SearchOptions) => void;
}

export interface Props {
  readonly active: boolean;
  readonly options: SearchOptions;
}

const SearchBar = (props: Props & Handlers) => {
  const { active, options, onToggle, onSearch } = props;

  const handleSearch = () => {
    onSearch(options);
  };

  const watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      event.preventDefault();
      onSearch(options);
    }
  };

  return active ? (
    <Card sectioned>
      <div onKeyPress={watchForEnter}>
        <Stack vertical>
          <SearchSettings />

          <SearchButtons onToggle={onToggle} active onSearch={handleSearch} />
        </Stack>
      </div>
    </Card>
  ) : (
    <Card sectioned>
      <Stack vertical={false} alignment="baseline">
        <SearchButtons
          onToggle={onToggle}
          active={false}
          onSearch={handleSearch}
        />
      </Stack>
    </Card>
  );
};

export default SearchBar;
