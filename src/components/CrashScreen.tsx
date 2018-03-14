import * as React from 'react';
import {
  Page,
  Layout,
  Card,
  TextStyle,
  ButtonGroup,
  Button
} from '@shopify/polaris';
import { NonIdealState, Collapse } from '@blueprintjs/core';
import { deletePersistedStateToast } from '../utils/toaster';
import * as localforage from 'localforage';
import { ImmutablePersistedStateKey } from '../types';
import { refreshPage } from '../utils/refresh';

interface Props {
  readonly errorDetails: Error;
}

interface State {
  readonly collapseOpen: boolean;
}

class CrashScreen extends React.PureComponent<Props, State> {
  public readonly state: State = { collapseOpen: false };

  private static deletePersistedState = (
    key: ImmutablePersistedStateKey
  ) => async () => {
    try {
      await localforage.removeItem(`reduxPersist:${key}`);
      deletePersistedStateToast(key);
    } catch (e) {
      console.warn(e);
    }
  };

  private toggleCollapse = () =>
    this.setState((prevState: State) => ({
      collapseOpen: !prevState.collapseOpen
    }));

  public render() {
    const { deletePersistedState } = CrashScreen;

    return (
      <Page title="Mturk Engine (Crashed)">
        <Layout>
          <Layout.Section>
            <NonIdealState title="Mturk Engine has crashed." visual="error" />
          </Layout.Section>
          <Layout.AnnotatedSection title="Refresh">
            <Card
              primaryFooterAction={{
                content: 'Refresh',
                onAction: refreshPage
              }}
            >
              <Card.Section>
                If the crash happened seemingly at random, try refreshing the
                page to see if that fixes the problem.
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection title="Submit an Error Report">
            <Card
              primaryFooterAction={{
                content: 'Github Issues',
                url: 'https://github.com/Anveio/mturk-engine/issues'
              }}
              secondaryFooterAction={{
                content: 'Toggle Error Logs',
                onAction: this.toggleCollapse
              }}
            >
              <Card.Section>
                If the crash happens consistently, you can browse the issues
                page on GitHub to see if there is a fix. If not, post an issue
                with the error logs.
              </Card.Section>
              <Card.Section>
                <Collapse isOpen={this.state.collapseOpen}>
                  <pre>{this.props.errorDetails || 'No error logs found'}</pre>
                </Collapse>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Delete Saved Data"
            description="These actions are irreversible and should only be used if other fixes did not work."
          >
            <Card>
              <Card.Section>
                If Mturk Engine crashed while navigating to the Blocklist,
                Watchers, or Account tab, it's possible that the crash was due
                to data corruption. You can try deleting the data relevant to
                the tab that caused the crash.{' '}
                <TextStyle variation="strong">
                  These actions are *NOT* reversable.
                </TextStyle>
              </Card.Section>
              <Card.Section>
                <ButtonGroup>
                  <Button
                    destructive
                    onClick={deletePersistedState('hitBlocklist')}
                  >
                    Delete Blocked HITs
                  </Button>
                  <Button
                    destructive
                    onClick={deletePersistedState('requesterBlocklist')}
                  >
                    Delete Blocked Requesters
                  </Button>
                  <Button
                    destructive
                    onClick={deletePersistedState('watchers')}
                  >
                    Delete Watchers
                  </Button>
                  <Button
                    destructive
                    onClick={deletePersistedState('hitDatabase')}
                  >
                    Delete HIT Database
                  </Button>
                </ButtonGroup>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>;
      </Page>
    );
  }
}

export default CrashScreen;
