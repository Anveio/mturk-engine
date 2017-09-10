import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../types';
import { FormAction, updateForm } from '../../actions/form';
import { Checkbox } from '@shopify/polaris';

interface Props {
  readonly value: boolean;
}

interface Handlers {
  readonly onChange: (value: boolean) => void;
}

class QualifiedBox extends React.PureComponent<Props & Handlers> {
  public render() {
    return (
      <Checkbox
        label="Qualified only"
        id="checkbox-qualified"
        name="Qualfiied Only Checkbox"
        checked={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

const mapState = (state: RootState): Props => ({
  value: state.searchOptions.qualified
});

const mapDispatch = (dispatch: Dispatch<FormAction>): Handlers => ({
  onChange: (value: boolean) => {
    dispatch(updateForm('qualified', value));
  }
});

export default connect(mapState, mapDispatch)(QualifiedBox);
