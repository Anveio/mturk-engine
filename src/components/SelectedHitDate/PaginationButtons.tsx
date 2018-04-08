import * as React from 'react';
import { Button } from '@blueprintjs/core';

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
      <div className="pt-button-group pt-minimal">
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
