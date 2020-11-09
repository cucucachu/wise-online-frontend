import React from 'react';
import FrameLink from './FrameLink';

function WebcamDetails(props) {
    return (
        <div className="proctor-details">
            {(() => {
                if (props.violations.length && props.violations.filter(v => v.confidenceScore !== undefined).length) {
                    return <p className="text-plain red">Student not detected in some images.</p>
                }
                else {
                    return <div></div>;
                }
            })()}
            {(() => {
                if (props.violations.length && props.violations.filter(v => v.numberOfPeople !== undefined).length) {
                    return <p className="text-plain red">Multiple people detected in some images.</p>
                }
                else {
                    return <div></div>;
                }
            })()}
            <div className="text-align-left">
                {(() => {
                    const frameLinks = [];

                    for (const violation of props.violations) {
                        frameLinks.push(
                            <FrameLink
                                key={`webcam-violation-${violation.frame}-${Math.random()}`}
                                frame={violation.frame}
                                text={violation.numberOfPeople !== undefined ? 'Multiple people detected' : 'Student\'s face not detected'}
                                onClick={props.handleFrameClick}
                            />
                        )
                    }

                    return frameLinks;
                })()}
            </div>
        </div>
    )
}

export default WebcamDetails;