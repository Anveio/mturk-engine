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
  readonly onToggle: (id: string) => void;
}

class WatcherCard extends React.PureComponent<
  OwnProps & Props & Handlers,
  never
> {
  public render() {
    return (
      <Card sectioned title={this.props.watcherId}>
        <Button plain onClick={() => this.props.onStart(this.props.watcherId)}>
          Start
        </Button>

        <Button
          destructive
          onClick={() => this.props.onDelete(this.props.watcherId)}
        >
          Delete Watcher
        </Button>
      </Card>
    );
  }
}

export default WatcherCard;
