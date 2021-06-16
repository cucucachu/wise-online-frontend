import React, {Component} from 'react';
import { i18n } from 'web-translate';

class ModalSupport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            path: '',
        }
    }

    Cancel = () => {
        const {
            handleClose,
        } = this.props;
        handleClose();
    };
    render() {
        const showHideClassName = this.props.show ? "display-modal-block" : "display-modal-none";
        return (
            <div className={showHideClassName}>
                <section className="modal-body">
                    <div className="animate-modal-zoom">
                        <div className="modal-headers justify-left" onClick={this.Cancel}>
                            <img src={require("../../src/Assets/images/times.svg")} alt="times" />
                        </div>

                        <div className="modal-contents">
                            <div>{i18n("Are you having trouble?")}</div>
                            <div>{i18n("Fear not! We love to help.")}</div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ModalSupport;

