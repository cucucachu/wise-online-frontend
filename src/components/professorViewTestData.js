import React, { Component, Fragment} from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import moment from 'moment'
import VideoModal from './videoModal'

import redFlag from '../Assets/images/red-flag.png'
import PlayIcon from '../Assets/images/play_circle_white.svg'
import PauseIcon from '../Assets/images/pause_circle_white.svg'
import PauseIconBk from '../Assets/images/pause_circle_black.svg'
import chevronLeft from '../Assets/images/chevron-left-black.svg'
import chevronRight from '../Assets/images/chevron_right-black.svg'
import { getTestImage, logout } from '../store/axios'

class ViewEachTestResult extends Component{
    constructor(props){
        super(props)
        this.playStop = this.playStop.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        this.nextSlide = this.nextSlide.bind(this)
        this.previousSlide = this.previousSlide.bind(this)
        this.toggleModal = this.toggleModal.bind(this)

        this.state = {
            testResult: {},
            formattedDate: '',
            red: 1,
            redArr: [],
            greenArr: [],
            yellowArr: [],
            testId: '',
            retrivedImg: '',
            imgNum: 0,
            numberOfImgs: 0,
            playVideo: false,
            toggleIcon: true,
            showHideStyle: true,
            showPause: false,
            isRedFlag: false,
            timeLeft: '',
            hasImg: false,
            testResultId: '',
            openModal: false,
            
        }
    }

    
    async previousSlide(){
        if(this.state.imgNum <= 0){
            console.log('first image')
        }else{
            const response = await getTestImage(this.state.testResultId, this.state.imgNum-1)
            if(response.status === 200){
                this.setState({retrivedImg: response.data, imgNum: this.state.imgNum-1})
            }else if(response.status === 401){
                sessionStorage.clear()
                logout()
                this.props.history.push({
                    pathname: '/professor-login',
                    state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
                  })
            }else{console.log('error')}
        }
        
    }
    async nextSlide(){
        if(this.state.imgNum >= this.state.numberOfImgs-1){
            console.log('last image')
        }else{
            const response = await getTestImage(this.state.testResultId, this.state.imgNum+1)
            if(response.status === 200){
                this.setState({retrivedImg: response.data, imgNum: this.state.imgNum+1})
            }else if(response.status === 401){
                sessionStorage.clear()
                logout()
                this.props.history.push({
                    pathname: '/professor-login',
                    state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
                  })
            }else{console.log('error')}
        }
        
    }
    handlePlay(){
        this.setState({
            playVideo: !this.state.playVideo, showHideStyle: false
          },()=>{
            this.playStop()
          }
          );
        
    }
    playStop(){
        if(this.state.playVideo === true){
            this.setState({showBtns: false})
            console.log('paly video: ', );
            
            this.timerID = setInterval(
                () => this.tick(),
                1000
              );
        }else{
            clearInterval(this.timerID);
            this.setState({playVideo: false, showHideStyle: true, showPause: false, showBtns: true})
            // this.setState({toggleName: 'Play'})
        }
    }
    showPauseBtn(){
        if(this.state.playVideo === true){
            this.setState({showPause: true})
        }else{return}
        
    }
    hidePauseBtn(){
        this.setState({showPause: false})
    }
    toggleModal(){
        this.setState(prevState => ({
            openModal: !prevState.openModal
          }));
    }
    pad(num) {
        return ("0"+num).slice(-2);
    }
    hhmmss(secs) {
      var minutes = Math.floor(secs / 60);
      secs = secs%60;
      var hours = Math.floor(minutes/60)
      minutes = minutes%60;
      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
      // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
    }
    async componentDidMount(){
        
        const { testResult } = this.props.location.state
        this.setState({testResultId: testResult.id})
        
        this.setState({formattedDate: moment.utc(testResult.startTime).format('MMM DD, YYYY'), testResult: testResult, red: testResult.tabs.red.length, redArr: testResult.tabs.red, yellowArr: testResult.tabs.yellow, testId: testResult.id, numberOfImgs: testResult.numberOfImages})
        if(testResult.confidenceScore <= 0.4 || testResult.tabs.red.length > 0){
            this.setState({isRedFlag: true})
        }else{
            this.setState({isRedFlag: false})
        }
        const response = await getTestImage(testResult.id, this.state.imgNum)
        if(response.status === 401){
            sessionStorage.clear()
            logout()
            this.props.history.push({
                pathname: '/professor-login',
                state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
              })
        }else if(response.status === 200){
            // console.log('checking', response.data)
            const retrivedImg = response.data
            if(retrivedImg !== null){
                this.setState({retrivedImg: retrivedImg, timeLeft: this.hhmmss(testResult.numberOfImages), hasImg: true})
            }else{console.log('no data')}
        }else{console.log('error', response)}
        
        
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
      }
    async tick() {
        //imgNum is a counter 
        if(this.state.imgNum < this.state.numberOfImgs-1){
            
            this.setState({
                imgNum: this.state.imgNum +1 
              });
            try{
                console.log('counter: ', this.state.imgNum)
                console.log('database num: ', this.state.numberOfImgs)
                const response = await getTestImage(this.state.testId, this.state.imgNum)
                if(response.status === 200){
                    const retrivedImg = response.data
                    this.setState({retrivedImg: retrivedImg})
                    const differences = this.state.numberOfImgs-1 - this.state.imgNum
                    this.setState({timeLeft: this.hhmmss(differences)})
                }else{
                    console.log('server error')
                }
            }
            catch (error){
                console.log('Oops, something went wrong. Please try again.')
            }
            
            
        }else{
            this.setState({imgNum: 0})
            const response = await getTestImage(this.state.testId, this.state.imgNum)
            const retrivedImg = response.data
            this.setState({retrivedImg: retrivedImg})
            this.setState({timeLeft: this.hhmmss(this.state.numberOfImgs)})
        }
        
      }
    render(){
        const showSlide = {justifyContent: 'space-between'}
        const showPauseIcon = {justifyContent: 'center'}

        return(
            <Fragment>
                {this.state.openModal ?  <VideoModal playVideo={this.state.playVideo} playStop={this.playStop} handlePlay={this.handlePlay} retrivedImg={this.state.retrivedImg} imgNum={this.state.imgNum} numberOfImgs={this.state.numberOfImgs} nextSlide={this.nextSlide} previousSlide={this.previousSlide} toggleModal={this.toggleModal}/> 
                :
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical-s"></div>
                    <h1>{this.state.testResult.student}, {this.state.formattedDate}</h1>
                    {this.state.testResult.confidenceScore <= 0.4  || this.state.red > 0 ? <h2 className="red-text"><img className="red-flag-l" src={redFlag} alt="red flag icon" />&nbsp;Red Flags Detected</h2> : '' }
                    <div className="spacer-vertical-s"></div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 view-details ">
                            {this.state.hasImg ? 
                            <div className="video-holder">
                            <img src={this.state.retrivedImg} className="custom-video-frame" onClick={this.handlePlay.bind(this)} onMouseEnter={this.showPauseBtn.bind(this)} onMouseLeave={this.hidePauseBtn.bind(this)}/>
                           
                            <img className="icon-on-video" src={PlayIcon} alt="play icon" style={{display: this.state.showHideStyle ? 'block' : 'none' }} onClick={this.handlePlay.bind(this)}/>
                            {/* <img className="icon-on-video" src={PauseIcon} style={{display: this.state.showPause ? 'block' : 'none' }} alt="puse icon" onMouseEnter={this.showPauseBtn.bind(this)} onClick={this.handlePlay.bind(this)}/> */}
                            </div> :
                            <div className="video-holder">No images</div>
                            }
                            
                            <div className="spacer-vertical-s"></div>
                            {/* <p style={{color: this.state.isRedFlag ? 'red' : '#ccc'}}>Video {this.state.isRedFlag ? <span className="red-text">red flags</span> : ''} {this.state.timeLeft}</p> */}
                            
                            <p style={{color: this.state.isRedFlag ? 'red' : '#ccc'}}>Video {this.state.isRedFlag ? <span className="red-text">red flags</span> : ''} Frame&nbsp;{this.state.imgNum +1}&nbsp;of&nbsp;{this.state.numberOfImgs}</p>

                            
                            <div className="playbutton-wrapper text-plain" style={this.state.playVideo ? showPauseIcon : showSlide}>
                            {!this.state.playVideo &&
                                <div className="btn-slide test" onClick={this.previousSlide.bind(this)}>
                                    <img className="icon-xxs" src={chevronLeft} alt="chevron left icon" />
                                    &nbsp;Previous
                                </div>
                            }
                            {this.state.playVideo && 
                                <img className="icon-m hover-pointer" src={PauseIconBk} alt="pause icon" onClick={this.handlePlay} />
                            }
                            {!this.state.playVideo &&
                                <div className="btn-slide" onClick={this.nextSlide.bind(this)}> 
                                Next&nbsp;
                                <img className="icon-xxs" src={chevronRight} alt="chevron right icon" />
                                </div>
                            }
                    
                            </div>
                            <div className="spacer-vertical-s"></div>
                            <p className="hover-pointer" onClick={this.toggleModal}>Full screen</p>
                           
                        </div>
                        <div className="col-md-6 col-lg-3 border-right-gray-lg">
                            <h3 className="text-plain">Red Flag tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.red > 0 ?
                                this.state.redArr.map((result, i) =>
                                <li className="" key={i}>{result}</li>
                                ) : 'none'
                                }
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3 border-right-gray">
                        <h3 className="text-plain">Unknown tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.greenArr.length > 0 ?
                                this.state.greenArr.map((result, i) =>
                                <li key={i}>{result}</li>
                                ) : 'none'
                                }
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3">
                        <h3 className="text-plain"> Whitelisted tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.yellowArr.length > 0 ?
                                this.state.yellowArr.map((result, i) =>
                                <li key={i}>{result}</li>
                                ) : 'none'
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                }
            </Fragment>
        )
    }
}

export default ViewEachTestResult