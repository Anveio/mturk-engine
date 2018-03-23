import * as React from 'react';
import { Button } from '@shopify/polaris';
import { Popover } from '@blueprintjs/core';

const MenuActivator: React.SFC<{}> = ({ children }) => (
  <Popover>
    <Button size="slim" icon="horizontalDots" />
    {children}
  </Popover>
);

export default MenuActivator;
