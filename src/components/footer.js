import React, {Component} from 'react';
import chatbotIcon from '../Assets/images/forum-blue.svg'

class Footer extends Component {
  render(){
      return(
          <footer>
              <p className="footer-style">
              ®2020 Wise Education Systems, Inc.  All Rights Reserved
              </p>
              <div className="chatbot">
                  <img src={chatbotIcon} alt="chatbot" className="chatbot-icon" />
              </div>
          </footer>
      )
  }
}

export default Footer;