import React from 'react';

import FrameLink from './FrameLink';

function ScreenshotDetails(props) {
    if (props.violations && props.violations.length) {
        return (
            <div>
                <p className="red">Forbidden Websites Detected</p>
                <div className="text-align-left">
                    
                    {(() => {
                        const frameLinks = [];

                        for (const violation of props.violations) {
                            frameLinks.push(
                                <FrameLink
                                    key={`screenshot-violation-${violation.frame}`}
                                    frame={violation.frame}
                                    text={`Website(s) detected: ${violation.websites}`}
                                    onClick={props.handleFrameClick}
                                />
                            )
                        }

                        return frameLinks;
                    })()}
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default ScreenshotDetails;