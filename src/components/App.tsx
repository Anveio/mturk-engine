import * as React from 'react';
import axios from 'axios';
import { Page, Stack, Banner } from '@shopify/polaris';

import { API_URL } from '../constants';
import { parseHitPage } from '../utils/parsing';
import { sampleData } from '../utils/sampleData';

import HitTable from './HitTable/HitTable';

interface State {
  data: null | HitTableEntry[];
}

class App extends React.Component<{}, State> {
  state = {
    data: sampleData
  };

  readonly params = (): SearchParams => ({
    selectedSearchType: 'hitgroups',
    sortType: 'LastUpdatedTime%3A1',
    pageSize: 25,
    minReward: 1.0,
    qualifiedFor: 'on'
  });

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
    return `${API_URL}/mturk/findhits?match=true`;
  };

  private readonly fetchData = () => {
    axios
      .get(this.queryString())
      .then(
        success => {
          // console.group(success.data);
          const data: string = success.data;
          const t0 = performance.now();
          const hits = parseHitPage(data);
          console.log(performance.now() - t0);
          this.setState((): Partial<State> => {
            return { data: hits };
          });
        },
        reject => {
          this.setState(() => ({ data: reject.data }));
        }
      )
      .catch(reason => {
        console.warn(reason);
      });
  };

  noDataMarkup = () => {
    return <p>No data found.</p>;
  };

  render() {
    return (
      <main>
        <Page
          title="Worker"
          primaryAction={{ content: 'Fetch Data', onAction: this.fetchData }}
        >
          <Stack vertical spacing="tight">
            <Banner />
            {this.state.data ? (
              <HitTable rows={this.state.data} />
            ) : (
              this.noDataMarkup()
            )}
          </Stack>
        </Page>
      </main>
    );
  }
}

export default App;
