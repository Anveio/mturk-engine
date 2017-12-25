import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Layout,
  Card,
  ResourceList,
  Stack,
  Banner,
  Button
} from '@shopify/polaris';
import { RootState } from '../../types';
import { queueItemsIds } from '../../selectors/queue';
import { FetchQueueRequest, fetchQueueRequest } from '../../actions/queue';
import EmptyQueue from './EmptyQueue';
import QueueCard from './QueueItemCard';
import { TabIndex } from '../../constants/tabs';

export interface Props {
  readonly selectedTabIndex: number;
  readonly queueItemIds: string[];
}

export interface Handlers {
  readonly onRefresh: () => void;
}

interface State {
  readonly bannerVisible: boolean;
}

class QueueTable extends React.PureComponent<Props & Handlers, State> {
  public readonly state: State = { bannerVisible: true };

  componentWillReceiveProps({ selectedTabIndex }: Props & Handlers) {
    if (
      this.props.selectedTabIndex !== selectedTabIndex &&
      selectedTabIndex === TabIndex.QUEUE
    ) {
      this.props.onRefresh();
    }
  }

  private dismissBanner = () => this.setState({ bannerVisible: false });

  public render() {
    const { queueItemIds, onRefresh } = this.props;

    return queueItemIds.length === 0 ? (
      <EmptyQueue onRefresh={onRefresh} />
    ) : (
      <Layout>
        <Layout.Section>
          <Stack vertical>
            {this.state.bannerVisible ? (
              <Banner status="warning" onDismiss={this.dismissBanner}>
                Mturk Engine incorrectly reports a successful accept when
                encountering a CAPTCHA. If you refresh your queue and your HIT
                isn't there, accept it manually and successfully complete the
                CAPTCHA.
              </Banner>
            ) : null}
            <Card sectioned>
              <Button onClick={onRefresh}>Refresh queue.</Button>
            </Card>
            <Card>
              <ResourceList
                items={queueItemIds}
                renderItem={(hitId: string) => <QueueCard hitId={hitId} />}
              />
            </Card>
          </Stack>
        </Layout.Section>
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  selectedTabIndex: state.tab,
  queueItemIds: queueItemsIds(state)
});

const mapDispatch = (dispatch: Dispatch<FetchQueueRequest>): Handlers => ({
  onRefresh: () => dispatch(fetchQueueRequest())
});

export default connect(mapState, mapDispatch)(QueueTable);
