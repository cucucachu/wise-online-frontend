import React from 'react';

function onClickClipboardLink() {
    const linkInput = document.getElementById('clipboard-link-input');
    linkInput.select();
    document.execCommand("copy");
}

function ClipboardLink(props) {
    return (
        <div className="clipboard-link">
            <input id="clipboard-link-input" type="text" value={props.link} readOnly></input>
            <button onClick={onClickClipboardLink} className="btn">&#10697;</button>
        </div>
    )
}

export default ClipboardLink;