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
  const textNoTO = (name: string) => {
    return <p>{name}</p>;
  };

  const buttonTO = ({ name, attrs }: Requester) => {
    return (
      <Button plain url={tutkopticonBaseUrl + id} external>
        {`${name} - ${calculateAverageScore(attrs) || 'No Data'}`}
      </Button>
    );
  };

  return typeof requester === 'string' ? textNoTO(requester) : buttonTO(requester);
};

export default RequesterButton;
