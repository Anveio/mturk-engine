import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, SearchOptions } from '../../types';
import { FormUpdate, updateForm } from '../../actions/form';
import { Checkbox } from '@shopify/polaris';
import { Dispatch } from 'redux';

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
  value: state.searchOptions.qualifiedOnly
});

const mapDispatch = (
  dispatch: Dispatch<FormUpdate<SearchOptions>>
): Handlers => ({
  onChange: (value: boolean) => {
    dispatch(
      updateForm<SearchOptions>('searchOptions', 'qualifiedOnly', value)
    );
  }
});

export default connect(
  mapState,
  mapDispatch
)(QualifiedBox);
