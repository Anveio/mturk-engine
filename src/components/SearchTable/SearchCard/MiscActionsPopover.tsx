import * as React from 'react';
import { Popover, ActionList, ComplexAction, Button } from '@shopify/polaris';
import { Section } from '@shopify/polaris/types/components/ActionList/ActionList';
import { SearchResult } from '../../../types';
import { generateMarkdownExport } from '../../../utils/export';

export interface State {
  readonly active: boolean;
}

export interface Props {
  readonly hit: SearchResult;
}

class MiscActionsPopOver extends React.PureComponent<Props, State> {
  public readonly state = { active: false };

  private exportActions: ComplexAction[] = [
    {
      content: 'MTurk Crowd',
      icon: 'export',
      onAction: () => console.log(generateMarkdownExport(this.props.hit))
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
