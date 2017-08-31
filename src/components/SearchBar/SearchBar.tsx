import * as React from 'react';
import { Card, Collapsible } from '@shopify/polaris';
import { SearchOptions } from '../../types';
import SearchSettings from '../../containers/SearchSettings';
import SearchButtons from './SearchButtons';

export interface Handlers {
  readonly onToggleSettings: () => void;
  readonly onSearch: (options: SearchOptions) => void;
}

export interface Props {
  readonly settingsActive: boolean;
  readonly searchActive: boolean;
  readonly options: SearchOptions;
}

const SearchBar = (props: Props & Handlers) => {
  const {
    settingsActive,
    searchActive,
    options,
    onToggleSettings,
    onSearch
  } = props;

  const handleSearch = () => {
    onSearch(options);
  };

  const watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      event.preventDefault();
      onSearch(options);
    }
  };

  return (
    <Card>
      <Card.Section>
        <SearchButtons
          onToggle={onToggleSettings}
          settingsActive={settingsActive}
          onSearch={handleSearch}
          searchActive={searchActive}
        />
      </Card.Section>
      <Collapsible open={settingsActive}>
        <Card.Section>
          <div onKeyPress={watchForEnter}>
            <SearchSettings />
          </div>
        </Card.Section>
      </Collapsible>
    </Card>
  );
};

export default SearchBar;
