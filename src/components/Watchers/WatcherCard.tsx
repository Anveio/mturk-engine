import * as React from 'react';
import { Card, Stack, Tooltip, Heading, Button } from '@shopify/polaris';
import { EditableText } from '@blueprintjs/core';
import { EditableField } from '../../actions/editWatcher';
import { Watcher } from '../../types';
import WatcherTimer from './WatcherTimer';

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
    field: EditableField,
    value: string | number
  ) => void;
}

class WatcherCard extends React.PureComponent<
  OwnProps & Props & Handlers,
  never
> {
  private static generateButtonContent = (active: boolean) =>
    active ? 'Stop' : 'Start';

  private static validateNumber = (value: string): boolean =>
    /^\d+$/.test(value);

  private handleDelete = () => this.props.onDelete(this.props.watcher.groupId);

  private handleToggle = () =>
    this.props.onToggle(this.props.watcher.groupId, this.props.watcher.active);

  private headingSection = (title: string) => {
    return (
      <Card.Section>
        <Stack vertical spacing="tight">
          <Heading>
            <EditableText
              intent={0}
              maxLength={80}
              value={title}
              selectAllOnFocus
              placeholder="Click to edit title"
              onChange={(value: string) =>
                this.props.onEdit(this.props.watcherId, 'title', value)}
            />
          </Heading>
          <WatcherTimer
            groupId={this.props.watcherId}
            active={this.props.watcher.active}
          />
        </Stack>
      </Card.Section>
    );
  };

  private descriptionSection = (description: string) => {
    return (
      <Card.Section>
        <EditableText
          maxLength={140}
          value={this.props.watcher.description}
          maxLines={4}
          multiline
          selectAllOnFocus
          onChange={(value: string) =>
            this.props.onEdit(this.props.watcherId, 'description', value)}
          placeholder={`ID starts with ${this.props.watcherId.slice(
            0,
            5
          )}. Click to edit description`}
        />
      </Card.Section>
    );
  };

  private delaySection = (delay: number) => {
    return (
      <Card.Section>
        Delay:{' '}
        <EditableText
          intent={0}
          maxLength={3}
          value={delay.toString()}
          selectAllOnFocus
          onChange={(value: string) =>
            this.props.onEdit(
              this.props.watcherId,
              'delay',
              WatcherCard.validateNumber(value) || value === '' ? value : delay
            )}
          minWidth={10}
        />{' '}
        seconds
      </Card.Section>
    );
  };

  private buttonSection = (watcher: Watcher) => {
    return (
      <Card.Section>
        <Stack distribution="equalSpacing">
          <Button destructive={watcher.active} onClick={this.handleToggle}>
            {WatcherCard.generateButtonContent(watcher.active)}
          </Button>

          <Tooltip content="Delete this watcher.">
            <Button
              disabled={watcher.active}
              onClick={this.handleDelete}
              icon="delete"
            />
          </Tooltip>
        </Stack>
      </Card.Section>
    );
  };

  public render() {
    const { watcher } = this.props;

    return (
      <Card>
        {this.headingSection(watcher.title)}
        {this.descriptionSection(watcher.description)}
        {this.delaySection(watcher.delay)}
        {this.buttonSection(watcher)}
      </Card>
    );
  }
}

export default WatcherCard;
