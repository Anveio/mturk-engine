import * as React from 'react';
import { Card, Collapsible } from '@shopify/polaris';
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

  return (
    <Card>
      <Card.Section>
        <SearchButtons
          onToggle={onToggle}
          active={active}
          onSearch={handleSearch}
        />
      </Card.Section>
      <Collapsible open={active}>
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
