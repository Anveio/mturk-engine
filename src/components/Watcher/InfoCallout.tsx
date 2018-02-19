import * as React from 'react';
import { Callout, IconClasses } from '@blueprintjs/core';

const InfoCallout = () => {
  return (
    <Callout className={IconClasses.INFO_SIGN}>
      You can start or stop a watcher by double clicking on it in the watcher
      menu.
    </Callout>
  );
};

export default InfoCallout;
