import * as React from 'react';

export interface Props {
}

class AudioLayer extends React.PureComponent<Props, never> {
  public render() {
    return (
      <div id="audio-layer">
        <audio id="new-search-result-audio">
          <source
            src="http://k003.kiwi6.com/hotlink/vnu75u0sif/file-sounds-765-tweet.ogg"
            type="audio/ogg"
          />
        </audio>
        <audio id="watcher-accept-audio">
          <source
            src="http://k003.kiwi6.com/hotlink/85iq6xu5ul/coins.ogg"
            type="audio/ogg"
          />
        </audio>
      </div>
    );
  }
}

export default AudioLayer;
