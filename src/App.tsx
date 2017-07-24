import * as React from 'react';
import axios from 'axios';
import { Page, Layout, Card } from '@shopify/polaris';

import { API_URL } from './constants';
import { stringToDomFragment, filterHits } from './utils';

interface State {
  data: any;
  clicked: number;
}

class App extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      data: null,
      clicked: 0
    };
  }

  readonly params = (): SearchParams => {
    return {
      selectedSearchType: 'hitgroups',
      sortType: 'LastUpdatedTime%3A1',
      pageSize: 25,
      minReward: 1.0,
      qualifiedFor: 'on'
    };
  };

  readonly queryString = (): string => {
    // let builtParams = '';
    // const params = this.params();
    // if (params) {
    //   for (let param in params) {
    //     if (param) {
    //       builtParams += `${param}=${params[param]}&`;
    //     }
    //   }
    // }

    // if (builtParams.endsWith('&')) {
    //   builtParams.substring(0, builtParams.length - 1);
    // }

    // // return `https://www.mturk.com/mturk/searchbar?${builtParams}`;
    return `${API_URL}`;
  };

  readonly fetchData = () => {
    axios
      .get(this.queryString(), {})
      .then(
        response => {
          const data: string = response.data;
          const hits = filterHits(stringToDomFragment(data));
          console.log(hits);
          
          this.setState(() => ({ data }));
        },
        reject => {
          this.setState(() => ({ data: reject.data }));
        }
      )
      .catch(reason => {
        console.error(reason);
      });
  };

  render() {
    return (
      <main>
        <Page
          title="Worker"
          primaryAction={{ content: 'Fetch Data', onAction: this.fetchData }}
        >
          <Layout.Section>
            <Card sectioned>
              {this.state.data || 'No data found.'} Clicked {this.state.clicked}{' '}
              times.
            </Card>
          </Layout.Section>
        </Page>
      </main>
    );
  }
}

export default App;
