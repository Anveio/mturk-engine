import * as React from 'react';
import { Card, Stack, DisplayText, Caption } from '@shopify/polaris';
import { SearchOptions } from '../../types';
import SearchSettings from '../../containers/SearchSettings';
import SearchButtons from './SearchButtons';

export interface Handlers {
  readonly onToggle: () => void;
  readonly onFetch: (options: SearchOptions) => void;
}

export interface Props {
  readonly active: boolean;
  readonly options: SearchOptions;
}

const SearchBar = (props: Props & Handlers) => {
  const { active, options, onToggle, onFetch } = props;

  const handleSearch = () => {
    onFetch(options);
  };

  const watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      event.preventDefault();
      onFetch(options);
    }
  };

  return active ? (
    <Card sectioned>
      <div onKeyPress={watchForEnter}>
        <Stack vertical>
          <DisplayText size="small">Edit search settings.</DisplayText>
          <Caption>
            Changes are saved as you type and will apply on your next search.
          </Caption>
          <SearchSettings />
          <SearchButtons onToggle={onToggle} active onFetch={handleSearch} />
        </Stack>
      </div>
    </Card>
  ) : (
    <Card sectioned>
      <SearchButtons
        onToggle={onToggle}
        active={false}
        onFetch={handleSearch}
      />
    </Card>
  );
};

export default SearchBar;
