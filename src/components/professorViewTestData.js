import React, { Component, Fragment} from 'react'
import viewIcon from '../Assets/images/view-icon.png'
import moment from 'moment'

import redFlag from '../Assets/images/red-flag.png'
import PlayIcon from '../Assets/images/play_circle_white.svg'
import PauseIcon from '../Assets/images/pause_circle_white.svg'
import { Link } from 'react-router-dom'
import chevronRight from '../Assets/images/chevron_right.svg'
import { getTestImage } from '../store/axios'


class ViewEachTestResult extends Component{
    constructor(props){
        super(props)
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
        }
    }
    handlePlay(){
        this.setState({
            playVideo: !this.state.playVideo, showHideStyle: false
          },()=>{
            this.playStop()
          }
          );
        console.log('clicked: ', this.state.playVideo);

        
    }
    playStop(){
        if(this.state.playVideo === true){
            console.log('palyvideo on: ', );
            
            this.timerID = setInterval(
                () => this.tick(),
                2000
              );
        }else{
            clearInterval(this.timerID);
            this.setState({playVideo: false, showHideStyle: true, showPause: false})
            // this.setState({toggleName: 'Play'})
        }
    }
    handlePauseBtn(){
        if(this.state.playVideo === true){
            this.setState({showPause: true})
        }
        
    }
    hidePauseBtn(){
        this.setState({showPause: false})
    }
    calcTimeLeft(){
        const total = this.state.result.numberOfImages
        // if (total > 0) {
        //     timeLeft = {
        //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        //       minutes: Math.floor((difference / 1000 / 60) % 60),
        //       seconds: Math.floor((difference / 1000) % 60)
        //     };
        //   }
        
        //   return timeLeft;
    }
    async componentDidMount(){
        
        const { testResult } = this.props.location.state
        
        this.setState({formattedDate: moment.utc(testResult.startTime).format('MMM DD, YYYY'), testResult: testResult, red: testResult.tabs.red.length, redArr: testResult.tabs.red, yellowArr: testResult.tabs.yellow, testId: testResult.id, numberOfImgs: testResult.numberOfImages})
        if(testResult.confidenceScore <= 0.4 || testResult.tabs.red.length > 0){
            this.setState({isRedFlag: true})
        }else{
            this.setState({isRedFlag: false})
        }
        const response = await getTestImage(testResult.id, this.state.imgNum)
        const retrivedImg = response.data
        console.log('image: ', retrivedImg);
        this.setState({retrivedImg: retrivedImg})

        console.log('test result: ', testResult);
            
        
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
      }
    async tick() {
        if(this.state.imgNum < this.state.numberOfImgs){
            this.setState({
                imgNum: this.state.imgNum +1
              });
            console.log('imgNum: ', this.state.imgNum);
            
            const response = await getTestImage(this.state.testId, this.state.imgNum)
            const retrivedImg = response.data
            console.log('retrived image: ', retrivedImg);
            
            this.setState({retrivedImg: retrivedImg})
        }else{
            this.setState({imgNum: 0})
            const response = await getTestImage(this.state.testId, this.state.imgNum)
            const retrivedImg = response.data
            this.setState({retrivedImg: retrivedImg})
        }
        
      }
    render(){
        return(
            <Fragment>
                <div className="container">
                    <img src={viewIcon} className="page-icon" alt="view icon"/>
                    <div className="spacer-vertical-s"></div>
                    <h1>{this.state.testResult.student}, {this.state.formattedDate}</h1>
        {this.state.testResult.confidenceScore <= 0.4  || this.state.red > 0 ? <h2 className="red-text"><img className="red-flag-l" src={redFlag} alt="red flag icon" />&nbsp;
Red Flags Detected</h2> : '' }
                    <div className="spacer-vertical-s"></div>
                    <div className="row">
                        <div className="col-sm-6 col-md-3 view-details ">
                            <div className="video-holder">
                                <img src={this.state.retrivedImg} className="custom-video-frame" onClick={this.handlePlay.bind(this)} onMouseEnter={this.handlePauseBtn.bind(this)} onMouseLeave={this.hidePauseBtn.bind(this)}/>
                               
                                {/* {this.state.toggleIcon ? <img className="icon-on-video" src={PlayIcon} alt="play icon" style={this.state.showHideStyle}/> : <img className="icon-on-video" src={PauseIcon} style={this.state.showHideStyle} alt="puse icon"/>} */}
                                <img className="icon-on-video" src={PlayIcon} alt="play icon" style={{display: this.state.showHideStyle ? 'block' : 'none' }}/>
                                <img className="icon-on-video" src={PauseIcon} style={{display: this.state.showPause ? 'block' : 'none' }} alt="puse icon"/>
                            </div>
                            
                            
                            <div className="spacer-vertical-s"></div>
        <p>Video {this.state.isRedFlag ? <span className="red-text">red flags</span> : ''} {}</p>
                            {/* <button className="btn" onClick={this.handlePlay.bind(this)}>{this.state.toggleName}</button> */}
                        </div>
                        <div className="col-sm-6 col-md-3 border-right">
                            <h3 className="text-plain">Red Flag tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.red > 0 ?
                                this.state.redArr.map((result, i) =>
                                <li className="" key={i}>{result}</li>
                                ) : 'no data'
                                }
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 border-right">
                        <h3 className="text-plain">Unknown tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.greenArr.length > 0 ?
                                this.state.greenArr.map((result, i) =>
                                <li key={i}>{result}</li>
                                ) : 'no data'
                                }
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3">
                        <h3 className="text-plain"> Whitelisted tabs</h3>
                            <ul className="result-li">
                                {
                                this.state.yellowArr.length > 0 ?
                                this.state.yellowArr.map((result, i) =>
                                <li key={i}>{result}</li>
                                ) : 'no data'
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ViewEachTestResult