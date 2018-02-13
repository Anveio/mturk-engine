import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Stack, TextContainer } from '@shopify/polaris';
import { Icon } from '@blueprintjs/core';
import { truncate } from '../../utils/formatting';
import { Watcher, RootState } from '../../types';

interface OwnProps {
  readonly watcherId: string;
}

interface Props {
  readonly watcher?: Watcher;
  readonly watcherActive: boolean;
}

class WatcherFolderListItem extends React.PureComponent<
  Props & OwnProps,
  never
> {
  static activeWatcherMarkup = () => (
    <Stack.Item>
      <TextContainer>Started</TextContainer>
    </Stack.Item>
  );

  public render() {
    const { watcher, watcherActive } = this.props;

    if (!watcher) {
      return null;
    }

    return (
      <Card sectioned>
        <Stack alignment="baseline" wrap={false}>
          <Stack.Item>
            <Icon iconName="document" />
          </Stack.Item>
          <Stack.Item fill>
            <TextContainer>{truncate(watcher.title)}</TextContainer>
          </Stack.Item>
          {watcherActive ? WatcherFolderListItem.activeWatcherMarkup() : null}
        </Stack>
      </Card>
    );
  }
}

const mapState = (state: RootState, { watcherId }: OwnProps): Props => ({
  watcher: state.watchers.get(watcherId),
  watcherActive: !!state.watcherTimes.get(watcherId)
});

export default connect(mapState)(WatcherFolderListItem);
