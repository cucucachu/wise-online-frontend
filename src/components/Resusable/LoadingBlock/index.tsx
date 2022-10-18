import * as React from 'react';
import { i18n } from 'web-translate';

export const LoadingBlock: React.FC<{}> = () => {
  return (
    <div>
      <div className="spacer-vertical" />
      <h2>{i18n("Loading")}
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </h2>
    </div>
  )
}
