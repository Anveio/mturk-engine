import * as React from 'react';
import { Card, Stack, Heading } from '@shopify/polaris';
import { Button, EditableText } from '@blueprintjs/core';
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
  static generateButtonContent = (active: boolean) =>
    active ? 'Stop' : 'Start';

  static validateNumber = (value: string): boolean => /^\d+$/.test(value);

  private descriptionSection = (description: string) => {
    return (
      <Card.Section>
        <EditableText
          maxLength={140}
          value={this.props.watcher.description}
          selectAllOnFocus
          onChange={(value: string) =>
            this.props.onEdit(this.props.watcherId, 'description', value)}
          defaultValue="Edit description"
        />
      </Card.Section>
    );
  };

  private headingSection = (title: string) => {
    return (
      <Card.Section>
        <Stack vertical spacing="tight">
          <Heading>
            <EditableText
              intent={0}
              maxLength={30}
              value={title}
              selectAllOnFocus
              defaultValue="Edit title"
              onChange={(value: string) =>
                this.props.onEdit(this.props.watcherId, 'title', value)}
            />
          </Heading>
          <WatcherTimer groupId={this.props.watcherId} />
        </Stack>
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
          defaultValue="Edit title"
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
          <Button
            onClick={() => this.props.onToggle(watcher.groupId, watcher.active)}
          >
            {WatcherCard.generateButtonContent(watcher.active)}
          </Button>

          <Button
            onClick={() => this.props.onDelete(watcher.groupId)}
            intent={3}
            iconName="delete"
          />
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
