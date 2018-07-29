import { Button } from '@shopify/polaris';
import { Set } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { createWatcherFolder } from '../../actions/watcherFolders';
import { watcherFolderUniqueNames } from '../../selectors/watcherFolders';
import { RootState, WatcherFolder } from '../../types';
import {
  createDefaultFolderName,
  findUnusedNumericSuffix,
  generateWatcherFolder
} from '../../utils/watcherFolder';

interface Props {
  readonly watcherFolderNames: Set<string>;
}

interface Handlers {
  readonly onCreateFolder: (payload: WatcherFolder) => void;
}

class CreateFolderButton extends React.PureComponent<Props & Handlers, never> {
  private handleCreateFolder = () => {
    const newWatcherFolder = generateWatcherFolder(
      createDefaultFolderName(
        findUnusedNumericSuffix(this.props.watcherFolderNames)
      ),
      new Date()
    );
    this.props.onCreateFolder(newWatcherFolder);
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

const mapDispatch: Handlers = {
  onCreateFolder: createWatcherFolder
};

export default connect(
  mapState,
  mapDispatch
)(CreateFolderButton);
