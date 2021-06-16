import React, {Component} from 'react';

import { i18n } from 'web-translate';

class Footer extends Component {
  render(){
      return(
          <footer>
              <p className="footer-style">
              ®2020 Wise Education Systems, Inc.  {i18n("All Rights Reserved")}
              </p>
          </footer>
      )
  }
}

export default Footer;