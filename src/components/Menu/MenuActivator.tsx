import * as React from 'react';
import { Button } from '@shopify/polaris';
import { Popover } from '@blueprintjs/core';

interface Props {
  readonly accessibilityLabel: string;
}

const MenuActivator: React.SFC<Props> = ({ accessibilityLabel, children }) => (
  <Popover>
    <Button
      size="slim"
      icon="horizontalDots"
      accessibilityLabel={accessibilityLabel}
    />
    {children}
  </Popover>
);

export default MenuActivator;
