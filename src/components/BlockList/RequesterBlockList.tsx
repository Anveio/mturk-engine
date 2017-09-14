import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import BlockedHitCard from '../../containers/BlockedRequesterTag';

export interface Props {
  readonly blockedRequesterIds: string[];
}

class RequesterBlockList extends React.PureComponent<Props, never> {
  public render() {
    return this.props.blockedRequesterIds.length === 0 ? (
      <div />
    ) : (
      <Card sectioned title="Recently blocked requesters">
        <Stack>
          {this.props.blockedRequesterIds.map((id: string) => (
            <BlockedHitCard blockedRequesterId={id} key={id} />
          ))}
        </Stack>
      </Card>
    );
  }
}

export default RequesterBlockList;
