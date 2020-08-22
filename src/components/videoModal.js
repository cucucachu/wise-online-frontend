import React, { Component, Fragment } from 'react'
import chevronLeft from '../Assets/images/chevron-left-sized.svg'
import chevronRight from '../Assets/images/chevron_right-white.svg'
import pauseIcon from '../Assets/images/pause_circle_white.svg'
import playIcon from '../Assets/images/play_circle_white.svg'
import closeIcon from '../Assets/images/close-24px.svg'

class VideoModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            something: ''
        }
    }
 

    render(){
        return(
            <div className="video-modal">
                
                <div className="video-modal-container">
                <img className="close-icon" src={closeIcon} alt="close icon" onClick={this.props.toggleModal} />
                    <img className="video-modal-img" src={this.props.retrivedImg} alt="student webcam"/>
                    <div className="video-modal-btn-wrapper">
                        <div className="prev-btn" onClick={this.props.prevSlide}>
                            {!this.props.playVideo && 
                            <Fragment>
                                <img className="icon-ss" src={chevronLeft} alt="chevron left icon"/> Previous
                            </Fragment>
                            }
                        </div>
                        <div>
                            {this.props.playVideo ? 
                                <img className="icon-l" onClick={this.props.handlePlay} src={pauseIcon} alt="pause icon" />
                                :
                                <img className="icon-l" src={playIcon} alt="pause icon" onClick={this.props.handlePlay} />
                            }
                        </div>
                        <div className="next-btn" onClick={this.props.nextSlide}>
                        {!this.props.playVideo && 
                        <Fragment>
                            Next <img className="icon-ss" src={chevronRight} alt="chevron right icon"/>
                        </Fragment>
                        }
                        </div>
                    </div>
                    <div className="spacer-vertical-s"></div>
                    <p style={{textAlign: 'center'}}>
                    Frame&nbsp;{this.props.imgNum +1}&nbsp;of&nbsp;{this.props.numberOfImgs}
                    </p>
                </div>
                
            </div>
        )
    }
}

export default VideoModal