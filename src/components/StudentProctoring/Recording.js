import React, { Component } from 'react';

import { i18n } from 'web-translate';

class GetPrivileges extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link: ''
        };
    }

    componentDidMount() {
        if (this.props.test.testLink) {
            let link = this.props.test.testLink;
            if (!(link.match(/(http:\/\/|https:\/\/)/g))) {
                link = "https://" + link;
            }

            this.setState({
                link: link
            })
        }
    }

    render() {
        return (
            <div className={`shadow center${this.props.show ? '' : ' display-none'}`}>
                <h1>{i18n("YOU ARE NOW BEING PROCTORED")}</h1>
                <div className="spacer-vertical-s" />
                <div className="width-80 center">
                    <h2>{i18n("Please open and complete your exam.")}</h2>
                    <div className="text-large txt-thin">{i18n("When you're done, click I'm done!")}</div>
                    {(() => {
                        if (this.props.test)
                            return (
                                <>
                                    <div className="spacer-vertical-s" />
                                    <h4 className="black">
                                        {i18n("Your test link is:")}&nbsp;
                                        <a
                                            href={this.state.link && this.state.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >{this.props.test.testLink}</a>
                                    </h4>
                                    <h4 className="black">
                                        {i18n("Your test password is:")}&nbsp; {this.props.test.testPassword}
                                    </h4>
                                </>
                            );
                        else return '';
                    })()}
                </div>
            </div>
        )
    }
}

export default GetPrivileges;