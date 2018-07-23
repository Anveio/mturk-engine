import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Stack, ButtonGroup, Button } from '@shopify/polaris';
import { toggleSearchActive } from '../../actions/updateValue';
import { RootState } from '../../types';
import SearchTimer from './SearchTimer';
import SearchSettings from './SearchSettings';
import { ConnectedCustomSearchField } from './SearchFields';
import { watchForEnter } from 'utils/watchForEnter';
import { searchRequestSingular } from 'actions/search';

interface Props {
  readonly searchActive: boolean;
}

interface Handlers {
  readonly onToggleSearch: () => void;
  readonly onSingleSearch: () => void;
}

class SearchBar extends React.PureComponent<Props & Handlers, never> {
  private static searchButtonText = (active: boolean) => {
    return active ? 'Stop searching' : 'Start searching';
  };

  private onEnter = watchForEnter<HTMLDivElement>(this.props.onSingleSearch);

  public render() {
    const { searchActive } = this.props;

    return (
      <Card.Section>
        <Stack vertical={false} alignment="center">
          <Stack.Item>
            <ButtonGroup segmented>
              <Button
                primary
                icon="search"
                accessibilityLabel="Toggle Search Button"
                onClick={this.props.onToggleSearch}
                destructive={searchActive}
              >
                {SearchBar.searchButtonText(searchActive)}
              </Button>
              <SearchSettings />
            </ButtonGroup>
          </Stack.Item>
          <Stack.Item>
            <div
              style={{
                maxWidth: '300px',
                minWidth: '250px'
              }}
              onKeyPress={this.onEnter}
            >
              <ConnectedCustomSearchField />
            </div>
          </Stack.Item>
          <Stack.Item>
            <SearchTimer />
          </Stack.Item>
        </Stack>
      </Card.Section>
    );
  }
}

const mapState = (state: RootState): Props => ({
  searchActive: state.searchingActive
});

const mapDispatch: Handlers = {
  onSingleSearch: searchRequestSingular,
  onToggleSearch: toggleSearchActive
};

export default connect(
  mapState,
  mapDispatch
)(SearchBar);
