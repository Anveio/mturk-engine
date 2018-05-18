import * as React from 'react';
import { TextStyle } from '@shopify/polaris';
import { Text } from '@blueprintjs/core';

interface Props {
  readonly requesterName: string;
}

const RequesterName: React.SFC<Props> = ({ requesterName }) => {
  return (
    <TextStyle variation="strong">
      <Text>{requesterName}</Text>
    </TextStyle>
  );
};

export default RequesterName;
