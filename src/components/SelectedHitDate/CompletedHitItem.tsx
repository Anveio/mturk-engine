import * as React from 'react';
import { RootState, HitDatabaseEntry, WorkerHitDatabaseEntry } from 'types';
import { connect } from 'react-redux';
import {
  ResourceList,
  Truncate,
  Badge,
  Stack,
  TextStyle
} from '@shopify/polaris';
import { Text } from '@blueprintjs/core';
import HitDbEntryCollapsible from './HitDbEntryCollapsible';
import { generateReviewLink } from 'utils/turkopticon';
import { generateContactLink } from 'utils/urls';
import { formatAsUsd } from 'utils/formatting';

interface OwnProps {
  readonly id: string;
}

interface Props {
  readonly hit: HitDatabaseEntry;
}

interface State {
  readonly expanded: boolean;
}

class CompletedHitItem extends React.PureComponent<Props & OwnProps, State> {
  public readonly state: State = { expanded: false };

  componentDidUpdate(nextProps: Props) {
    if (nextProps.hit.id !== this.props.hit.id) {
      this.setState(() => ({
        expanded: false
      }));
    }
  }

  private static displayEarnings = (reward: number, bonus: number) =>
    bonus > 0
      ? `${formatAsUsd(reward)} + ${formatAsUsd(bonus)}`
      : `${formatAsUsd(reward)}`;

  private generateActions = (assignmentId?: string) => [
    {
      content: 'Contact',
      url: assignmentId
        ? generateContactLink(this.props.hit as WorkerHitDatabaseEntry)
        : undefined,
      external: true,
      disabled: this.props.hit.assignmentId ? false : true
    },
    {
      content: 'Review',
      url: generateReviewLink(this.props.hit),
      external: true
    }
  ];

  private handleExpand = () => {
    this.setState((prevState: State) => ({
      expanded: !prevState.expanded
    }));
  };

  public render() {
    const { hit } = this.props;
    return (
      <React.Fragment>
        <ResourceList.Item
          id={hit.id}
          onClick={this.handleExpand}
          shortcutActions={this.generateActions(hit.assignmentId)}
        >
          <Stack vertical={false} wrap={false} alignment="center">
            <Stack.Item>
              <TextStyle variation="strong">
                <Truncate>{hit.requester.name}</Truncate>
              </TextStyle>
            </Stack.Item>
            <Stack.Item fill>
              <Text ellipsize>{hit.title}</Text>
            </Stack.Item>
            <Stack.Item>
              <Stack vertical={false}>
                <Stack.Item>
                  <TextStyle variation="strong">
                    {CompletedHitItem.displayEarnings(hit.reward, hit.bonus)}
                  </TextStyle>
                </Stack.Item>
                <Stack.Item>
                  <Badge status={'success'}>Paid</Badge>
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </ResourceList.Item>
        <HitDbEntryCollapsible open={this.state.expanded} hit={hit} />
      </React.Fragment>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.hitDatabase.get(ownProps.id)
});

export default connect(mapState)(CompletedHitItem);
