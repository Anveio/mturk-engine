import * as React from 'react';
import { Button } from '@shopify/polaris';
import { Popover, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';
import { SearchResult } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';
import { addWatcherToast, copyMarkdownToast } from '../../utils/toastr';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { watcherFactoryFromSearchResult } from '../../utils/watchers';

const mapState = (state: RootState, ownProps: Props): Props => ({
  hit: ownProps.hit
});

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (hit: SearchResult) => {
    dispatch(addWatcher(watcherFactoryFromSearchResult(hit)));
    addWatcherToast(hit);
  }
});

import { generateMarkdownExport } from '../../utils/export';

export interface Props {
  readonly hit: SearchResult;
}

export interface Handlers {
  readonly onAddWatcher: (hit: SearchResult) => void;
}

class MiscActionsPopOver extends React.PureComponent<Props & Handlers, never> {
  public render() {
    return (
      <Popover>
        <Button size="slim" icon="horizontalDots" />
        <Menu>
          <MenuDivider title="HIT Actions" />
          <MenuItem
            iconName="new-object"
            onClick={() => {
              this.props.onAddWatcher(this.props.hit);
            }}
            text="Add as Watcher"
          />
          <MenuItem
            iconName="duplicate"
            onClick={() => {
              copy(generateMarkdownExport(this.props.hit));
              copyMarkdownToast(this.props.hit);
            }}
            text="Copy to Clipboard"
          />
        </Menu>
      </Popover>
    );
  }
}

export default connect(mapState, mapDispatch)(MiscActionsPopOver);
