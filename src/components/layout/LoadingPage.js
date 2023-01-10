import React from "react";

import { Dimmer, Loader} from "semantic-ui-react";

const LoadingPage = (props) => (
  <div className={props._class}>
      <Dimmer active inverted>
        <Loader inverted>{props.children}</Loader>
      </Dimmer>
  </div>
);

export default LoadingPage;
