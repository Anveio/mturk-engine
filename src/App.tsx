import * as React from 'react';
import axios from 'axios';
import { Page, Layout, Card } from '@shopify/polaris';
// tslint:disable:no-any
// tslint:disable:semicolon
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

    // return `https://www.mturk.com/mturk/searchbar?${builtParams}`;
    return `https://www.mturk.com/mturk/checkrecognition`;
  };

  readonly fetchData = () => {
    axios
      .get(this.queryString(), {  })
      .then(
        response =>
          this.setState(() => {
            return {
              data: response.data
            };
          }),
        reject => {
          this.setState(() => {
            return {
              data: reject.data
            };
          });
        }
      )
      .catch(reason => {
        return reason;
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
              {this.state.data || 'No data found.'}. Clicked{' '}
              {this.state.clicked} times.
            </Card>
          </Layout.Section>
        </Page>
      </main>
    );
  }
}

export default App;
