import React, { useRef, useEffect } from 'react';
import ViewTable from '../Resusable/ViewTable';
import Spinner from '../Resusable/Spinner';
import {ScreenshotViewer} from '../Resusable/ScreenshotViewer';

type ProctorDetailViewProps = {
    onChangeSlider(value: number): void;
    onNextFrame(value: boolean): void;
    proctorDetail: any;
    proctorConfiguration: any;
    max: number;
    frame: number;
    onClickPlay(): void;
    onClickPause(): void;
    hasIssues: boolean;
    onClickNextIssue(): void;
}

function ProctorDetailView(props: ProctorDetailViewProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

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
        <ScreenshotViewer.Container>
            <ScreenshotViewer.ImageContainer>
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
            </ScreenshotViewer.ImageContainer>
            <ScreenshotViewer.ImageContainer>
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
            </ScreenshotViewer.ImageContainer>
            <ScreenshotViewer.Slider max={props.max - 1} value={props.frame} onChange={props.onChangeSlider} />
            <ScreenshotViewer.PlayControls
                onClickPlay={props.onClickPlay}
                onClickNextIssue={props.onClickNextIssue}
                onClickPause={props.onClickPause}
                hasNext={props.hasIssues}
                infoText={`Frame ${props.frame + 1} / ${props.max} @ ${props.proctorDetail.time}`}
            />
                { props.proctorDetail.voiceDetected && 
                    (
                        <div className="row align-items-center">
                            <div className="col-3">
                                <audio ref={audioRef} src={props.proctorDetail.audioURL} autoPlay controls controlsList="nodownload"/>
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
                            render: (val: any) => val ? 'Yes' : 'No',
                        },
                    ]}
                    rows={[props.proctorDetail]}
                />
            </div>

        </ScreenshotViewer.Container>
    );
}

export default ProctorDetailView;
