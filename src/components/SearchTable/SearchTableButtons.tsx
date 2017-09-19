import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { MarkAllHitsAsRead, markAllHitsAsRead } from '../../actions/markAsRead';
import { Stack, ButtonGroup, Button } from '@shopify/polaris';

export interface Handlers {
  readonly onMarkAllAsRead: () => void;
}

class SearchTableButtons extends React.PureComponent<Handlers, never> {
  public render() {
    return (
      <Stack vertical={false} alignment="center">
        <ButtonGroup>
          <Button plain onClick={this.props.onMarkAllAsRead}>
            Mark all as read
          </Button>
          <Button plain>Collapse all</Button>
        </ButtonGroup>
      </Stack>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<MarkAllHitsAsRead>): Handlers => ({
  onMarkAllAsRead: () => dispatch(markAllHitsAsRead())
});

export default connect(null, mapDispatch)(SearchTableButtons);
