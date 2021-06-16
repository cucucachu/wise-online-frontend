import React from 'react';

function onClickClipboardLink() {
    const linkInput = document.getElementById('clipboard-link-input');
    linkInput.select();
    document.execCommand("copy");
    showCopied();
    setTimeout(hideCopied, 2000);
}

function showCopied() {
    const clipboardConfirm = document.getElementById('clipboard-link-confirm');
    clipboardConfirm.style.transition = 'none';
    clipboardConfirm.style.opacity = 1;
}

function hideCopied() {
    const clipboardConfirm = document.getElementById('clipboard-link-confirm');
    if (clipboardConfirm) {
        clipboardConfirm.style.transition = 'all 1s';
        clipboardConfirm.style.opacity = 0;
    }
}

function ClipboardLink(props) {
    return (
        <div className="clipboard-link">
            <input id="clipboard-link-input" type="text" value={props.link} readOnly></input>
            <button onClick={onClickClipboardLink} className="btn">&#10697;&nbsp;{i18n("copy")}</button>
            <div id="clipboard-link-confirm" className="clipboard-link-confirm">
                <p>&#10003; {i18n("Copied")}</p>
            </div>
        </div>
    )
}

export default ClipboardLink;