import * as React from 'react';
import { Card, Button } from '@shopify/polaris';
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
      <Card sectioned title={watcher.groupId}>
        <Button
          plain
          onClick={() => this.props.onToggle(watcher.groupId, watcher.active)}
        >
          Start
        </Button>

        <Button
          destructive
          onClick={() => this.props.onDelete(watcher.groupId)}
        >
          Delete Watcher
        </Button>
      </Card>
    );
  }
}

export default WatcherCard;
