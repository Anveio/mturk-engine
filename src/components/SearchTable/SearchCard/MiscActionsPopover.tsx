import * as React from 'react';
import { Popover, ActionList, ComplexAction, Button } from '@shopify/polaris';
import { Section } from '@shopify/polaris/types/components/ActionList/ActionList';

export interface Props {
  readonly groupId: string;
  readonly requesterId: string;
}

export interface State {
  readonly active: boolean;
}

class SearchCardInfoButtons extends React.PureComponent<Props, State> {
  public readonly state = { active: false };

  private handleClick = () =>
    this.setState((prevState: State): Partial<State> => ({
      active: !prevState.active
    }));

  public render() {
    const hitActions: ComplexAction[] = [
      {
        content: 'Accept',
        url: `https://www.mturk.com/mturk/previewandaccept?groupId=${this.props
          .groupId}`,
        icon: 'checkmark'
      },
      {
        content: 'Preview',
        url: `https://www.mturk.com/mturk/preview?groupId=${this.props
          .groupId}`,
        icon: 'view'
      },
      {
        content: 'T.O. Page',
        url: `https://turkopticon.ucsd.edu/${this.props.requesterId}`,
        icon: 'notes'
      }
    ];

    const exportActions: ComplexAction[] = [
      {
        content: 'MTurk Crowd',
        icon: 'export'
      }
    ];

    /**
     * @TODO: Copy export to user's clipboard.
     */
    const sections: Section[] = [
      {
        title: 'Links',
        items: hitActions
      },
      {
        title: 'Export Options',
        items: exportActions
      }
    ];

    return (
      <Popover
        active={this.state.active}
        activator={<Button onClick={this.handleClick}>Actions</Button>}
        onClose={() => {}}
        sectioned
      >
        <ActionList sections={sections} />
      </Popover>
    );
  }
}

export default SearchCardInfoButtons;
