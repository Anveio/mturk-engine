import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { Card } from '@shopify/polaris';
import { EditableText } from '@blueprintjs/core';
import { plainToast } from '../../utils/toaster';

interface Props {
  readonly id: string;
  readonly description: string;
  readonly onChangeDescription: (value: string) => void;
}

class WatcherInfo extends React.PureComponent<Props, never> {
  private copyId = () => {
    copy(this.props.id);
    plainToast(`Watcher project ID copied to clipboard.`);
  };

  public render() {
    const { description, onChangeDescription } = this.props;
    return (
      <Card
        sectioned
        title={`Description`}
        actions={[
          {
            content: 'Copy ID',
            onAction: this.copyId
          }
        ]}
      >
        <EditableText
          value={description}
          maxLength={500}
          multiline
          selectAllOnFocus
          onChange={onChangeDescription}
          placeholder={`Click to edit description`}
        />
      </Card>
    );
  }
}

export default WatcherInfo;
