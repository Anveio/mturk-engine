import * as React from 'react';
import { Button } from '@shopify/polaris';

interface Props {
  requesterName: string;
  score: number;
}

const TOpticonButton = ({ requesterName, score }: Props) => {
  return (
    <Button size="slim" plain icon="risk">
      {`${requesterName} - ${score || 'No T.O'}`}
    </Button>
  );
};

export default TOpticonButton;
