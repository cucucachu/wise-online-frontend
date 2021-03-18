import React, { Component } from 'react';

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
                <h1>YOU ARE NOW BEING PROCTORED</h1>
                <div className="spacer-vertical-s" />
                <div className="width-80 center">
                    <h2>Please open and complete your exam.</h2>
                    <div className="text-large txt-thin">When you're done, click I'm done!</div>
                    {(() => {
                        if (this.props.test)
                            return (
                                <>
                                    <div className="spacer-vertical-s" />
                                    <h4 className="black">
                                        Your test link is:&nbsp;
                                        <a
                                            href={this.state.link && this.state.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >{this.props.test.testLink}</a>
                                    </h4>
                                    <h4 className="black">
                                        Your test password is:&nbsp; {this.props.test.keyCode}
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