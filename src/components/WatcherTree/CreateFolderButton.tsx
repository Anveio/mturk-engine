import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from '@shopify/polaris';
import { Set } from 'immutable';
import { RootState, WatcherFolder } from '../../types';
import {
  CreateWatcherFolder,
  createWatcherFolder
} from '../../actions/watcherFolders';
import { watcherFolderUniqueNames } from '../../selectors/watcherFolders';
import {
  createDefaultFolderName,
  findUnusedNumericSuffix,
  generateWatcherFolder
} from '../../utils/watcherFolder';

interface Props {
  readonly watcherFolderNames: Set<string>;
}

interface Handlers {
  readonly onCreateFolder: (id: string, payload: WatcherFolder) => void;
}

class CreateFolderButton extends React.PureComponent<Props & Handlers, never> {
  private handleCreateFolder = () => {
    const newWatcherFolder = generateWatcherFolder(
      createDefaultFolderName(
        findUnusedNumericSuffix(this.props.watcherFolderNames)
      ),
      new Date()
    );
    this.props.onCreateFolder(newWatcherFolder.id, newWatcherFolder);
  };

  public render() {
    return (
      <Button onClick={this.handleCreateFolder} icon="circlePlus">
        Create folder
      </Button>
    );
  }
}

const mapState = (state: RootState): Props => ({
  watcherFolderNames: watcherFolderUniqueNames(state)
});

const mapDispatch = (dispatch: Dispatch<CreateWatcherFolder>): Handlers => ({
  onCreateFolder: (id: string, payload: WatcherFolder) =>
    dispatch(createWatcherFolder(id, payload))
});

export default connect(mapState, mapDispatch)(CreateFolderButton);
