import * as React from 'react';
import { Requester } from '../../types';
import { Button, Stack } from '@shopify/polaris';
import RequesterBadges from './RequesterBadges';
import { calculateAverageScore } from '../../utils/turkopticon';
import { tutkopticonBaseUrl } from '../../constants';

interface Props {
  readonly requester: Requester | string;
  readonly id: string;
}

const RequesterButton = ({ requester, id }: Props) => {
  const textNoTO = (name: string) => {
    return (
      <Stack spacing="tight" vertical={false}>
        <p>{name}</p>
      </Stack>
    );
  };

  const buttonTO = (props: Requester) => {
    return (
      <Stack spacing="tight" vertical={false}>
        <Button plain url={tutkopticonBaseUrl + id} external>
          {`${props.name} - ${calculateAverageScore(props.attrs) || 'No Data'}`}
        </Button>
        <RequesterBadges {...props} />
      </Stack>
    );
  };

  return typeof requester === 'string' ? textNoTO(requester) : buttonTO(requester);
};

export default RequesterButton;
