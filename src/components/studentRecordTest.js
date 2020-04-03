import React, { useEffect, useState, useContext } from 'react'
import Webcam, {onUserMediaError} from "react-webcam";
import { Link } from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext'
import editIcon from '../Assets/images/edit-icon.png'
import cameraIcon from '../Assets/images/camera-icon.png'
import recordingIcon from '../Assets/images/recording-icon.png'

import { uploadReferenceImage, checkForStudent } from '../store/faces';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
    };

const StudentRecordTest = (props) => {
    const webcamRef = React.useRef(null);
    const { referenceImage, setReferenceImage } = useState(null);
    const { testAttendanceId } = useContext(AuthContext)

    const convertImage = image => {
        
      var data = image.split(',')[1];
      
      var bytes = window.atob(data);
      var buf = new ArrayBuffer(bytes.length);
      var byteArr = new Uint8Array(buf);
  
      for (var i = 0; i < bytes.length; i++) {
          byteArr[i] = bytes.charCodeAt(i);
      }

      return byteArr;
    }

    const capture = React.useCallback(
        async () => {
          
          const imageSrc = webcamRef.current.getScreenshot();    

          const image = convertImage(imageSrc);

          if(imageSrc == null){
            props.history.push("recording-error");
          }
          else {
            if (!referenceImage) {
              console.log(imageSrc);
              const faceId = await uploadReferenceImage(image);
              setReferenceImage(faceId);
            }
            else {
              await checkForStudent(testAttendanceId, referenceImage, imageSrc);
            }
          }
        },
        [webcamRef, referenceImage, setReferenceImage]
        
      );
      
      useEffect(() => {
        const interval = setInterval(() => {
          capture()
          // console.log('This will run every min!');
        }, 5000);

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