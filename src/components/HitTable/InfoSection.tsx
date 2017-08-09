import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import RequesterButton from './RequesterButton';
import { Requester } from '../../types';
import { truncate } from '../../utils/formatting';

export interface Props {
  readonly requester: Requester | string;
  readonly title: string;
  readonly requesterId: string;
}

const RequesterInfo = ({ title, requester, requesterId }: Props) => {
  return (
    <Card.Section title={truncate(title)}>
      <Stack spacing="tight">
        <RequesterButton requester={requester} id={requesterId} />
      </Stack>
    </Card.Section>
  );
};

export default RequesterInfo;
