import React, {Component} from 'react';

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
                            <div>Are you having trouble?</div>
                            <div>Fear not! We love to help.</div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ModalSupport;

