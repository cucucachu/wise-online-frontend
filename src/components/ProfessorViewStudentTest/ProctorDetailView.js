import React, { useRef, useEffect } from 'react';
import ViewTable from '../Resusable/ViewTable';
import Spinner from '../Resusable/Spinner';

function ProctorDetailView(props) {
    const audioRef = useRef();

    useEffect(() => {
        if (audioRef.current) {
            const onEnded = () => {
                props.onNextFrame(true); // force to skip
            };
            audioRef.current.addEventListener('ended', onEnded);
            return () => { if (audioRef.current) audioRef.current.removeEventListener('ended', onEnded); }
        }
    });

    if (props.proctorDetail === undefined) {
        return <Spinner/>;
    }

    props.proctorDetail.datetime = new Date(props.proctorDetail.timestamp).toLocaleString();
    props.proctorDetail.time = new Date(props.proctorDetail.timestamp).toLocaleTimeString();

    if (!props.proctorDetail.numberOfPeople || !props.proctorDetail.confidenceScore) {
        props.proctorDetail.studentPresent = 'No';
    }
    else if (props.proctorDetail.confidenceScore < props.proctorConfiguration.facialRecognitionThreshold) {
        props.proctorDetail.studentPresent = 'No';
    }
    else {
        props.proctorDetail.studentPresent = 'Yes';
    }

    if (props.proctorDetail.confidenceScore !== undefined) {
        props.proctorDetail.confidence = `${Math.floor(100 *props.proctorDetail.confidenceScore)}%`;
    }
    else {
        props.proctorDetail.confidence = 'N/A';
    }

    props.proctorDetail.websites = [];
    if (props.proctorDetail.forbiddenURLs) {
        props.proctorDetail.websites = [...props.proctorDetail.websites, ...props.proctorDetail.forbiddenURLs];
    }
    if (props.proctorDetail.unknownURLs) {
        props.proctorDetail.websites = [...props.proctorDetail.websites, ...props.proctorDetail.unknownURLs];
    }
    return (
        <div className="proctor-detail-view">
            <div className="row">
                <div className="col">
                    <div className="image-holder">
                        {(() => {
                            if (!props.proctorDetail.hasWebcamImage) {
                                return (
                                    <h2 className="center">No Image Received</h2>
                                )
                            }
                            else if (props.proctorDetail.webcamURL) {
                                return (
                                    <img 
                                        height="450" 
                                        width="800"
                                        src={props.proctorDetail.webcamURL}
                                        alt="Webcam"
                                    />
                                );
                            }
                            else {
                                return (
                                    <Spinner />
                                )
                            }
                        })()}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="image-holder">
                        {(() => {
                            if (!props.proctorDetail.hasScreenshot) {
                                return (
                                    <h2 className="center">No Image Recieved</h2>
                                )
                            }
                            else if (props.proctorDetail.screenshotURL) {
                                return (
                                    <img 
                                        height="450" 
                                        width="800"
                                        src={props.proctorDetail.screenshotURL}
                                        alt="Screenshot"
                                    />
                                );
                            }
                            else {
                                return (
                                    <Spinner />
                                );
                            }
                        })()}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="slider-container">
                        <input type="range" min="0" max={props.max - 1} value={props.frame} className="slider" onChange={e => props.onChangeSlider(e)}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <button className="play-button" onClick={props.onClickPlay}>&#9656;</button>
                    <button className="pause-button" onClick={props.onClickPause}>||</button>
                    {(() => {
                        if (props.hasIssues) {
                            return (
                                <span>
                                    <button className="issue-button" onClick={props.onClickNextIssue}>Next Issue</button>
                                </span>
                            )
                        }
                        else return '';
                    })()}
                </div>
                <div className="col-4 black align-right">
                    Frame {props.frame + 1} / {props.max} @ {props.proctorDetail.time}
                </div>
            </div>
                { props.proctorDetail.audio && 
                    (
                        <div className="row align-items-center">
                            <div className="col-3">
                                <audio ref={audioRef} src={props.proctorDetail.audio} autoPlay controls controlsList="nodownload"/>
                            </div>
                        </div>
                    )
                }
            
            <div className="row">
                <ViewTable 
                    title="Details"
                    columns={[
                        {
                            label: 'Timestamp',
                            propertyName: 'datetime',
                        },
                        {
                            label: 'Student Present',
                            propertyName: 'studentPresent',
                        },
                        {
                            label: 'Facial Recognition Score',
                            propertyName: 'confidence',
                        },
                        {
                            label: 'Number of People',
                            propertyName: 'numberOfPeople',
                        },
                        {
                            label: 'Websites',
                            propertyName: 'websites',
                        },
                        { 
                            label: 'Speaking Detected',
                            propertyName: 'voiceDetected',
                            render: val => val ? 'Yes' : 'No',
                        },
                    ]}
                    rows={[props.proctorDetail]}
                />
            </div>

        </div>
    );
}

export default ProctorDetailView;
