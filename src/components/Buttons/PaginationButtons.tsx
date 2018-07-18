import * as React from 'react';
import { Pagination } from '@shopify/polaris';

export interface DatabaseFilterPaginationProps {
  readonly shouldRender: boolean;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  readonly onNext: () => void;
  readonly onPrevious: () => void;
}

class PaginationButtons extends React.Component<
  DatabaseFilterPaginationProps,
  never
> {
  private static paginationButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    borderTop: '1px solid #dfe4e8'
  };

  public render() {
    return (
      this.props.shouldRender && (
        <div style={PaginationButtons.paginationButtonStyle}>
          <Pagination {...this.props} />
        </div>
      )
    );
  }
}

export default PaginationButtons;
