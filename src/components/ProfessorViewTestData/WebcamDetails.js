import React from 'react';
import FrameLink from './FrameLink';

function WebcamDetails(props) {
    return (
        <div className="proctor-details">
            {(() => {
                if (props.violations.length) {
                    return <p className="text-plain red">Student not detected in some images.</p>
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
                                key={`webcam-violation-${violation.frame}`}
                                frame={violation.frame}
                                text="Student's face not detected"
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