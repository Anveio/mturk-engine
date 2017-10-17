import * as React from 'react';
import { Button } from '@shopify/polaris';
import { Popover, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import * as copy from 'copy-to-clipboard';
import { SearchResult } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';
import { addWatcherToast, copyMarkdownToast } from '../../utils/toaster';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { watcherFactoryFromSearchResult } from '../../utils/watchers';
import { generateHwtfUrl } from '../../utils/export';
import { generateContactLinkSearchResult } from '../../utils/turkopticon';

const mapState = (state: RootState, ownProps: Props): Props => ({
  hit: ownProps.hit
});

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (hit: SearchResult) => {
    dispatch(addWatcher(watcherFactoryFromSearchResult(hit)));
    addWatcherToast(hit.title);
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
  private handleAddWatcher = () => this.props.onAddWatcher(this.props.hit);

  private handleCopyMarkDown = () => {
    {
      copy(generateMarkdownExport(this.props.hit));
      copyMarkdownToast(this.props.hit.title);
    }
  };

  public render() {
    return (
      <Popover>
        <Button size="slim" icon="horizontalDots" />
        <Menu>
          <MenuDivider title="HIT Actions" />
          <MenuItem
            iconName="new-object"
            onClick={this.handleAddWatcher}
            text="Add as Watcher"
            target="_blank"
          />
          <MenuItem
            iconName="person"
            target="_blank"
            text="Contact Requester"
            href={generateContactLinkSearchResult(this.props.hit)}
          />
          <MenuDivider title="Share" />
          <MenuItem
            iconName="share"
            href={generateHwtfUrl(this.props.hit)}
            target="_blank"
            text="Post to HWTF"
          />
          <MenuItem
            iconName="duplicate"
            onClick={this.handleCopyMarkDown}
            text="Copy to Clipboard"
          />
        </Menu>
      </Popover>
    );
  }
}

export default connect(mapState, mapDispatch)(MiscActionsPopOver);
