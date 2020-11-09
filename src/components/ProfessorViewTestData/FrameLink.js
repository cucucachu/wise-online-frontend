import React from 'react';

function FrameLink(props) {
    return (
        <button className="frame-link" onClick={() => props.onClick(props.frame)}>
            {props.text} at frame {props.frame}
        </button>
    );
}

export default FrameLink;