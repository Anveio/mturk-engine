import * as React from 'react';
import { Button } from '@blueprintjs/core';
import { MINIMAL_BUTTON_GROUP } from 'constants/blueprint';

export interface Props {
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}

export interface Handlers {
  readonly onNext: () => void;
  readonly onPrevious: () => void;
}

class PaginationButtons extends React.PureComponent<Props & Handlers, never> {
  public render() {
    const { hasNext, hasPrevious, onNext, onPrevious } = this.props;
    return (
      <div className={MINIMAL_BUTTON_GROUP}>
        <Button
          disabled={!hasPrevious}
          icon="arrow-left"
          onClick={onPrevious}
        />
        <Button disabled={!hasNext} icon="arrow-right" onClick={onNext} />
      </div>
    );
  }
}

export default PaginationButtons;
