import * as React from 'react';
import { Requester } from '../../types';
import { Button } from '@shopify/polaris';
import { calculateAverageScore } from '../../utils/turkopticon';
import { tutkopticonBaseUrl } from '../../constants';

interface Props {
  readonly requester: Requester | string;
  readonly id: string;
}

const RequesterButton = ({ requester, id }: Props) => {
  const buttonNoTO = (name: string) => {
    return (
      <Button plain url={tutkopticonBaseUrl + id} external>
        {`${name}`}
      </Button>
    );
  };

  const buttonTO = ({ name, attrs }: Requester) => {
    return (
      <Button plain url={tutkopticonBaseUrl + id} external>
        {`${name} - ${calculateAverageScore(attrs)}`}
      </Button>
    );
  };

  return typeof requester === 'string' ? buttonNoTO(requester) : buttonTO(requester);
};

export default RequesterButton;
