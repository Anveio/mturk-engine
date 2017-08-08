import * as React from 'react';
import { Card, Stack } from '@shopify/polaris';
import RequesterButton from './RequesterButton';
import { Requester } from '../../types';
import { truncate } from '../../utils/formatting';

interface Props {
  requester: Requester | string;
  title: string;
}

const RequesterInfo = ({ title, requester }: Props) => {
  return (
    <Card.Section title={truncate(title)}>
      <Stack spacing="tight">
        <RequesterButton requester={requester} />
      </Stack>
    </Card.Section>
  );
};

export default RequesterInfo;
