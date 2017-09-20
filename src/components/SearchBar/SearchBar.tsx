import * as React from 'react';
import { Card } from '@shopify/polaris';

import SearchButtons from '../../containers/SearchButtons';

const SearchBar = () => {
  return (
    <Card>
      <SearchButtons />
      {/* <SearchSettings /> */}
    </Card>
  );
};

export default SearchBar;
