import * as React from 'react';
import SearchTable from '../../containers/SearchTable';
import SearchBar from '../SearchBar/SearchBar';

const SearchTab = () => {
  return (
    <div>
      <SearchBar />
      <SearchTable />
    </div>
  );
};

export default SearchTab;
