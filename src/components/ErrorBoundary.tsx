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
import { ImmutablePersistedStateKeys } from '../types';

interface State {
  readonly error: boolean;
  readonly errorDetails?: Error;
  readonly collapseOpen: boolean;
}

interface Props {
  // tslint:disable-next-line:no-any
  readonly children: any;
}

class ErrorBoundary extends React.PureComponent<Props, State> {
  public readonly state: State = { error: false, collapseOpen: false };

  componentDidCatch(errorDetails: Error) {
    this.setState((): Partial<State> => ({
      error: true,
      errorDetails
    }));
  }

  private deletePersistedState = (
    key: ImmutablePersistedStateKeys
  ) => async () => {
    try {
      await localforage.removeItem(`reduxPersist:${key}`);
      deletePersistedStateToast(key);
    } catch (e) {
      console.warn(e);
    }
  };

  private toggleCollapse = () =>
    this.setState((prevState: State): Partial<State> => ({
      collapseOpen: !prevState.collapseOpen
    }));

  public render() {
    return this.state.error === true ? (
      <Page title="Mturk Engine (Crashed)">
        <Layout>
          <Layout.Section>
            <NonIdealState title="Mturk Engine has crashed." visual="error" />
          </Layout.Section>
          <Layout.AnnotatedSection title="Refresh">
            <Card
              primaryFooterAction={{
                content: 'Refresh',
                onAction: () => (location = location)
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
                  <pre>{this.state.errorDetails || 'No error logs found'}</pre>
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
                the tab that caused the crash. {' '}
                <TextStyle variation="strong">
                  These actions are *NOT* reversable.
                </TextStyle>
              </Card.Section>
              <Card.Section>
                <ButtonGroup>
                  <Button
                    destructive
                    onClick={this.deletePersistedState('hitBlocklist')}
                  >
                    Delete Blocked HITs
                  </Button>
                  <Button
                    destructive
                    onClick={this.deletePersistedState('requesterBlocklist')}
                  >
                    Delete Blocked Requesters
                  </Button>
                  <Button
                    destructive
                    onClick={this.deletePersistedState('watchers')}
                  >
                    Delete Watchers
                  </Button>
                  <Button
                    destructive
                    onClick={this.deletePersistedState('hitDatabase')}
                  >
                    Delete HIT Database
                  </Button>
                </ButtonGroup>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
