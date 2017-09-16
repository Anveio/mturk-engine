import * as React from 'react';
import { Card, Heading, Caption } from '@shopify/polaris';
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
        <Caption>
          <EditableText
            intent={0}
            maxLength={140}
            value={this.props.watcher.description}
            selectAllOnFocus
            onChange={(value: string) =>
              this.props.onEdit(this.props.watcherId, 'description', value)}
            defaultValue="Edit description"
          />
        </Caption>
      </Card.Section>
    );
  };

  private headingSection = (title: string) => {
    return (
      <Card.Section>
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
      </Card.Section>
    );
  };

  private delaySection = (delay: number) => {
    return (
      <Card.Section>
        Delay:{' '}
        <EditableText
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

  public render() {
    const { watcher } = this.props;

    return (
      <Card>
        {this.headingSection(watcher.title)}
        {this.descriptionSection(watcher.description)}
        {this.delaySection(watcher.delay)}

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
          <WatcherTimer groupId={this.props.watcherId} />
        </Card.Section>
      </Card>
    );
  }
}

export default WatcherCard;
