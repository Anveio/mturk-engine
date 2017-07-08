import * as React from 'react';
import axios from 'axios';
import { Page, Layout, Card } from '@shopify/polaris';

class App extends React.Component<{}, {}> {
  readonly params = () => {
    return {
      selectedSearchType: 'hitgroups',
      sortType: 'LastUpdatedTime%3A1',
      pageSize: 25,
      minReward: 1.0,
      qualifiedFor: 'on'
    };
  };

  readonly queryString = (): string => {
    // const {
    //   selectedSearchType,
    //   sortType,
    //   pageSize,
    //   minReward,
    //   qualifiedFor
    // } = this.params();

    let builtParams = '';
    const params = this.params();
    if (params) {
      for (let param in params) {
        if (param) {
          builtParams += `${param}=${params[param]}&`;
        }
      }
    }

    if (builtParams.endsWith('&')) {
      builtParams.substring(0, builtParams.length - 1);
    }

    return `https://www.mturk.com/mturk/searchbar?${builtParams}`;
  };

  readonly fetchData = () => {
    axios.get(this.queryString()).then(response => console.log(response.data));
  };

  render() {
    return (
      <main>
        <Page
          title="Worker"
          primaryAction={{ content: 'Fetch Data', onAction: this.fetchData }}
        >
          <Layout.Section>
            <Card sectioned>Sample Data.</Card>
          </Layout.Section>
        </Page>
      </main>
    );
  }
}

export default App;
