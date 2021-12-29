import React, { Component } from 'react';

import { i18n } from 'web-translate';

class Recording extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link: ''
        };
    }

    // componentDidMount() {
    //     if (this.props.test.testLink) {
    //         let link = this.props.test.testLink;
    //         if (!(link.match(/(http:\/\/|https:\/\/)/g))) {
    //             link = "https://" + link;
    //         }

    //         this.setState({
    //             link: link
    //         })
    //     }
    // }

    render() {
        return (
            <div className={`shadow center${this.props.show ? '' : ' display-none'}`}>
                <h1>{i18n("SUCCESS!")}</h1>
                <div className="spacer-vertical-s" />
                <div className="width-80 center">
                    <h2>{i18n("You Are Now Ready To Take A Real Exam")}</h2>
                    <div className="text-large txt-thin">{i18n("Click the button below to return to your student dashboard.")}</div>
                </div>
            </div>
        )
    }
}

export default Recording;