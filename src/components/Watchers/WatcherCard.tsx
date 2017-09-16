import * as React from 'react';
// import { Button } from '@shopify/polaris';
import { Button, Switch, EditableText } from '@blueprintjs/core';
import { Watcher } from '../../types';

export interface OwnProps {
  readonly watcherId: string;
}

export interface Props {
  readonly watcher: Watcher;
}

export interface Handlers {
  readonly onDelete: (id: string) => void;
  readonly onToggle: (id: string, active: boolean) => void;
}

class WatcherCard extends React.PureComponent<
  OwnProps & Props & Handlers,
  never
> {
  static generateButtonContent = (active: boolean) =>
    active ? 'Stop' : 'Start';

  public render() {
    const { watcher } = this.props;

    return (
      <div className="pt-card pt-elevation-2 pt-interactive">
        <h5>
          <EditableText
            intent={0}
            maxLength={30}
            value={watcher.title}
            defaultValue="Edit title"
          />
        </h5>
        <p>
          Delay:{' '}
          <EditableText
            intent={0}
            maxLength={30}
            value={watcher.delay.toString()}
            defaultValue="Edit title"
            minWidth={10}
          />{' '}
          seconds
        </p>
        <div className=".pt-minimal">
          <Switch
            onClick={() => this.props.onToggle(watcher.groupId, watcher.active)}
            label={WatcherCard.generateButtonContent(watcher.active)}
          />

          <Button onClick={() => this.props.onDelete(watcher.groupId)}>
            Delete Watcher
          </Button>
        </div>
      </div>
    );
  }
}

export default WatcherCard;
