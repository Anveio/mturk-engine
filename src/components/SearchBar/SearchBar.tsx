import * as React from 'react';
import { connect } from 'react-redux';
import { Card, ButtonGroup, Button, Stack } from '@shopify/polaris';
import { toggleSearchActive } from '../../actions/updateValue';
import { RootState } from '../../types';
import SearchSettings from './SearchSettings';
import { ConnectedCustomSearchField as CustomSearchField } from './SearchFields';
import { watchForEnter } from 'utils/watchForEnter';
import { searchRequestSingular } from 'actions/search';
import SearchTimer from './SearchTimer';

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
        <Stack vertical={false} spacing="tight" alignment="center" >
          <Stack.Item fill>
            <div onKeyPress={this.onEnter}>
              <CustomSearchField
                connectedLeft={
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
                }
              />
            </div>
          </Stack.Item>
          <Stack.Item>
            <div
              style={{
                width: '215px'
              }}
            >
              <SearchTimer />
            </div>
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
