import * as React from 'react';
import { Intent, Spinner } from '@blueprintjs/core';
import { RootState } from '../../types';
import { connect } from 'react-redux';

interface Props {
  readonly isSelected: boolean;
}

interface OwnProps {
  readonly id: string;
  readonly progress: number;
}

class ProgressSpinner extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { isSelected, progress } = this.props;
    return (
      <Spinner
        size={Spinner.SIZE_SMALL}
        value={progress}
        intent={isSelected ? Intent.WARNING : Intent.NONE}
      />
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  isSelected: state.watcherTreeSettings.selectionId === ownProps.id
});

export default connect(mapState)(ProgressSpinner);
