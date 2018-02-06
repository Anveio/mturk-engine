import * as React from 'react';
// import { Tabs2 as Tabs, Tab2 as Tab } from '@blueprintjs/core';
// import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { Classes, Tooltip, Tree } from '@blueprintjs/core';
import { Layout, Stack, DisplayText } from '@shopify/polaris';
import { RootState } from '../../types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { watcherIdsList } from '../../selectors/watchers';

export interface Props {
  readonly watcherIds: List<string>;
}

class WatchersNew extends React.PureComponent<Props, never> {
  public render() {
    return (
      <Layout>
        <Layout.Section secondary>
          <Stack vertical>
            <DisplayText>Watchers</DisplayText>
            {/* <Menu >
              <MenuItem iconName="new-text-box" text="New text box" />
              <MenuItem iconName="new-object" text="New object" />
              <MenuItem iconName="new-link" text="New link" />
              <MenuDivider />
              <MenuItem text="Settings..." iconName="cog" />
            </Menu> */}
            <Tree
              className={Classes.ELEVATION_0}
              contents={[
                {
                  id: 1,
                  iconName: 'folder-close',
                  isExpanded: true,
                  label: 'Unsorted Watchers',
                  childNodes: [
                    {
                      id: 2,
                      iconName: 'document',
                      label: 'Item 0'
                    },
                    {
                      id: 3,
                      iconName: 'tag',
                      label:
                        'Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.'
                    },
                    {
                      id: 4,
                      hasCaret: true,
                      iconName: 'folder-close',
                      label: <Tooltip content="foo">Folder 2</Tooltip>,
                      childNodes: [
                        { id: 5, label: 'No-Icon Item' },
                        { id: 6, iconName: 'tag', label: 'Item 1' },
                        {
                          id: 7,
                          hasCaret: true,
                          iconName: 'folder-close',
                          label: 'Folder 3',
                          childNodes: [
                            { id: 8, iconName: 'document', label: 'Item 0' },
                            { id: 9, iconName: 'tag', label: 'Item 1' }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]}
            />
          </Stack>
        </Layout.Section>
        <Layout.Section>
          <DisplayText>Hey there don't be scared</DisplayText>
        </Layout.Section>;
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  watcherIds: watcherIdsList(state)
});

export default connect(mapState)(WatchersNew);
