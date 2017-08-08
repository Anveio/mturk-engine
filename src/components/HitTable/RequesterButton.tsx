import * as React from 'react';
import { Requester } from '../../types';
import { Button } from '@shopify/polaris';
import { calculateAverageScore } from '../../utils/turkopticon';

interface Props {
  readonly requester: Requester | string;
}

const RequesterButton = ({ requester }: Props) => {
  return typeof requester === 'string' ? buttonNoTO(requester) : buttonTO(requester);
};

const buttonNoTO = (name: string) => {
  return (
    <Button size="slim" plain >
      {`${name}`}
    </Button>
  );
};

const buttonTO = ({ name, attrs }: Requester) => {
  return (
    <Button size="slim" plain icon="risk">
      {`${name} - ${calculateAverageScore(attrs) || 'No T.O'}`}
    </Button>
  );
};

export default RequesterButton;
