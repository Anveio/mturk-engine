import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../types';
import { List } from 'immutable';
import { ResourceList } from '@shopify/polaris';
import { hitsOnSelectedDateIds } from '../../../selectors/hitDatabaseDay';
import { RESULTS_PER_PAGE } from '../../../constants/misc';
import CompletedHitItem from './CompletedHitItem';
import NoActivity from './NoActivity';

export interface Props {
  readonly hitsOnSelectedDate: List<string>;
}

export interface OwnProps {
  readonly page: number;
}

class CompletedHitList extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { hitsOnSelectedDate, page } = this.props;
    const start = RESULTS_PER_PAGE * page;
    const end = start + RESULTS_PER_PAGE;
    const itemsToShow = hitsOnSelectedDate.slice(start, end);

    return hitsOnSelectedDate.size > 0 ? (
      <ResourceList
        items={itemsToShow.toArray()}
        renderItem={(id: string) => <CompletedHitItem id={id} />}
      />
    ) : (
      <NoActivity />
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitsOnSelectedDate: hitsOnSelectedDateIds(state)
});

export default connect(mapState)(CompletedHitList);
