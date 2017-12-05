import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, Stack, ButtonGroup, Button } from '@shopify/polaris';
import {
  toggleSearchActive,
  ToggleSearchActive
} from '../../actions/updateValue';
import { RootState } from '../../types';
import SearchTimer from './SearchTimer';
import SearchSettings from './SearchSettings';

export interface Props {
  readonly searchActive: boolean;
}

export interface Handlers {
  readonly onToggleSearch: () => void;
}

class SearchButtons extends React.PureComponent<Props & Handlers, never> {
  private handleSearch = () => {
    this.props.onToggleSearch();
  };

  private static searchButtonText = (active: boolean) => {
    return active ? 'Stop searching' : 'Start searching';
  };

  public render() {
    const { searchActive } = this.props;

    return (
      <Card sectioned>
        <Stack vertical={false} alignment="center">
          <ButtonGroup segmented>
            <Button
              primary
              icon="search"
              accessibilityLabel="Toggle Search Button"
              onClick={this.handleSearch}
              destructive={searchActive}
            >
              {SearchButtons.searchButtonText(searchActive)}
            </Button>
            <SearchSettings />
          </ButtonGroup>
          <SearchTimer />
        </Stack>
      </Card>
    );
  }
}

const mapState = (state: RootState): Props => ({
  searchActive: state.searchingActive
});

const mapDispatch = (dispatch: Dispatch<ToggleSearchActive>): Handlers => ({
  onToggleSearch: () => dispatch(toggleSearchActive())
});

export default connect(mapState, mapDispatch)(SearchButtons);
