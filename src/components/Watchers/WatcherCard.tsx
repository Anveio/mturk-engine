import * as React from 'react';
import { Card, Heading } from '@shopify/polaris';
import { Button, EditableText } from '@blueprintjs/core';
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
  readonly onEdit: (
    id: string,
    field: keyof Watcher,
    value: string | number
  ) => void;
}

class WatcherCard extends React.PureComponent<
  OwnProps & Props & Handlers,
  never
> {
  static generateButtonContent = (active: boolean) =>
    active ? 'Stop' : 'Start';

  static validateNumber = (value: string): boolean => /^\d+$/.test(value);

  public render() {
    const { watcher } = this.props;

    return (
      <Card>
        <Card.Section>
          <Heading>
            <EditableText
              intent={0}
              maxLength={30}
              value={watcher.title}
              selectAllOnFocus
              onChange={(value: string) =>
                this.props.onEdit(this.props.watcherId, 'title', value)}
              defaultValue="Edit title"
            />
          </Heading>
        </Card.Section>
        <Card.Section>
          Delay:{' '}
          <EditableText
            maxLength={3}
            value={watcher.delay.toString()}
            selectAllOnFocus
            onChange={(value: string) =>
              this.props.onEdit(
                this.props.watcherId,
                'delay',
                WatcherCard.validateNumber(value) || value === ''
                  ? value
                  : watcher.delay
              )}
            defaultValue="Edit title"
            minWidth={10}
          />{' '}
          seconds
        </Card.Section>
        <Card.Section>
          <div className=".pt-button-group .pt-minimal">
            <Button
              onClick={() =>
                this.props.onToggle(watcher.groupId, watcher.active)}
            >
              {WatcherCard.generateButtonContent(watcher.active)}
            </Button>

            <Button onClick={() => this.props.onDelete(watcher.groupId)}>
              Delete
            </Button>
          </div>
        </Card.Section>
      </Card>
    );
  }
}

export default WatcherCard;
