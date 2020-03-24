import React, { useEffect } from 'react'
import Webcam from "react-webcam";

import editIcon from '../Assets/images/edit-icon.png'
import cameraIcon from '../Assets/images/camera-icon.png'
import recordingIcon from '../Assets/images/recording-icon.png'
import { Link } from "react-router-dom";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
    };

const StudentRecordTest = () => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
          console.log('image object updated every min: ', imageSrc);
        },
        [webcamRef]
        
      );
      useEffect(() => {
        const interval = setInterval(() => {
          capture()
          console.log('This will run every min!');
        }, 60000);
        return () => clearInterval(interval);
      }, []);
    return ( 
        <React.Fragment>
            <div className="container">
                <img src={editIcon} className="page-icon" alt="edit icon"/>
                <div className="spacer-vertical"></div>
                <h1>Now Proctoring</h1>
                <div className="spacer-vertical"></div>
                <Webcam
                    audio={false}
                    height={315}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={600}
                    videoConstraints={videoConstraints}
                /><br/>
                {/* <button onClick={capture}>Capture photo</button> */}
                {/* <div className="">
                    <img src={cameraIcon} alt="camera icon" />
                </div> */}
                <p className="text-plain"><img className="icon-xs" src={recordingIcon} alt="recording icon"></img>Recording in progress</p>
                <div className="spacer-vertical"></div>
                <Link to="/student/dashboard">
                  <button className="btn">End recording</button>
                </Link>
            </div>
        </React.Fragment>
     )
}

export default StudentRecordTest