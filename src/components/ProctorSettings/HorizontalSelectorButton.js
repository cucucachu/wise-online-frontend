import React from 'react';

function HorizontalSelectorButton(props) {
    let cssClass = 'horizontal-selector-button';

    if (props.position === -1) {
        cssClass += ' right-border-radius-0';
        cssClass += ' green';
    }
    else if (props.position === 1) {
        cssClass += ' left-border-radius-0';
        cssClass += ' red-bg';
    }
    else if (props.position === 0) {
        cssClass += ' orange';
    }

    if (props.selected) {
        cssClass += ' active';
    }

    return (
        <button className={cssClass} onClick={() => {props.onClick(props.index)}}>
            {props.text}
        </button>
    );
}

export default HorizontalSelectorButton;