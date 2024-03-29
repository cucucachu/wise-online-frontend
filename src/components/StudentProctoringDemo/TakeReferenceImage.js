import React, { Component } from 'react';


import { demoProctoringSetReferenceImage } from '../../store/axios';

import { i18n } from 'web-translate';


class GetPrivileges extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
        }

        this.takeReferenceImage = this.takeReferenceImage.bind(this);
    }

    async takeReferenceImage() {
        const image = this.props.webcamRef.current.getImage();

        const response = await demoProctoringSetReferenceImage({
            webcamImage: image,
        });

        if (response.status === 200 && response.data.successful) {
            this.props.onReferenceImage();
        }
        else {
            this.setState({
                ...this.state,
                message: 'We could not find your face in this picture, please try again.',
            });
        }
    }

    render() {
        return (
            <div className={`shadow center${this.props.show ? '' : ' display-none'}`}>
                <h2>{i18n("Almost There...")}</h2>
                <hr/>
                <div className="spacer-vertical-s"></div>
                <div className="width-80 center">
                    <h2>{i18n("Take The First Picture to Get Started")}</h2>
                    <div className="spacer-vertical-s"></div>
                    <div className="black width-60 text-align-left">
                        <ul>
                            <li>{i18n("Make sure the camera has a good view of your face, and take a picture with the button below.")}</li>
                            <li>{i18n("You cannot continue without a successful picture.")}</li>
                        </ul>
                    </div>
                    {(() => {
                        if (this.state.message)
                            return <p className="red">{this.state.message}</p>;
                        else return '';
                    })()}
                    <button className='btn' onClick={this.takeReferenceImage}>{i18n("Take Picture")}</button>
                </div>
            </div>
        )
    }
}

export default GetPrivileges;