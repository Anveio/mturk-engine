import * as React from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';

interface Props {
  readonly onToggle: () => void;
  readonly text: string;
}

const SearchButtons = ({ onToggle, text }: Props) => {
  return (
    <ButtonGroup>
      <Button onClick={onToggle}>{text}</Button>
    </ButtonGroup>
  );
};

export default SearchButtons;
