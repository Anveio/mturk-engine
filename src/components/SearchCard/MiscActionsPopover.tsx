import * as React from 'react';
import { Popover, ActionList, ComplexAction, Button } from '@shopify/polaris';
import * as copy from 'copy-to-clipboard';
// import { Section } from '@shopify/polaris/types/components/ActionList/ActionList';
import { SearchResult } from '../../types';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';
import { AddWatcher, addWatcher } from '../../actions/watcher';
import { watcherFactoryFromSearchResult } from '../../utils/watchers';

const mapState = (state: RootState, ownProps: Props): Props => ({
  hit: ownProps.hit
});

const mapDispatch = (dispatch: Dispatch<AddWatcher>): Handlers => ({
  onAddWatcher: (hit: SearchResult) =>
    dispatch(addWatcher(watcherFactoryFromSearchResult(hit)))
});

import { generateMarkdownExport } from '../../utils/export';

export interface State {
  readonly active: boolean;
}

export interface Props {
  readonly hit: SearchResult;
}

export interface Handlers {
  onAddWatcher: (hit: SearchResult) => void;
}

class MiscActionsPopOver extends React.PureComponent<Props & Handlers, State> {
  public readonly state = { active: false };

  private exportActions: ComplexAction[] = [
    {
      content: 'Add as Watcher',
      icon: 'duplicate',
      onAction: () => {
        this.props.onAddWatcher(this.props.hit);
        this.closePopover();
      }
    },
    {
      content: 'Copy to Clipboard',
      icon: 'export',
      onAction: () => {
        copy(generateMarkdownExport(this.props.hit));
        this.closePopover();
      }
    }
  ];

  private handleClick = () =>
    this.setState((prevState: State): Partial<State> => ({
      active: !prevState.active
    }));

  private closePopover = () =>
    this.setState((): Partial<State> => ({
      active: false
    }));

  public render() {
    return (
      <Popover
        preventAutofocus
        active={this.state.active}
        activator={
          <Button
            size="slim"
            onClick={this.handleClick}
            icon="horizontalDots"
          />
        }
        onClose={() => ({})}
        sectioned
      >
        <ActionList items={this.exportActions} />
      </Popover>
    );
  }
}

export default connect(mapState, mapDispatch)(MiscActionsPopOver);
