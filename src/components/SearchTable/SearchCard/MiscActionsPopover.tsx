import * as React from 'react';
import { Popover, ActionList, ComplexAction, Button } from '@shopify/polaris';
import { Section } from '@shopify/polaris/types/components/ActionList/ActionList';

export interface State {
  readonly active: boolean;
}

class MiscActionsPopOver extends React.PureComponent<{}, State> {
  public readonly state = { active: false };

  private exportActions: ComplexAction[] = [
    {
      content: 'MTurk Crowd',
      icon: 'export'
    }
  ];

  /**
   * @TODO: Copy export to user's clipboard.
   */
  private sections: Section[] = [
    {
      title: 'Export Options',
      items: this.exportActions
    }
  ];

  private handleClick = () =>
    this.setState((prevState: State): Partial<State> => ({
      active: !prevState.active
    }));

  public render() {
    return (
      <Popover
        active={this.state.active}
        activator={
          <Button
            size="slim"
            onClick={this.handleClick}
            icon="horizontalDots"
          />
        }
        onClose={() => {}}
        sectioned
      >
        <ActionList sections={this.sections} />
      </Popover>
    );
  }
}

export default MiscActionsPopOver;
