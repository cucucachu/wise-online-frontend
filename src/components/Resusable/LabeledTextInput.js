import React from 'react';

function LabeledTextInput(props) {
    return (
        <div className="test-detail-body">
            <div className="flex-justify">
                <div className="detail-txt">{props.label}</div>
                <div className="detail-input">
                    <div className="labeled-input">
                        <input
                            type="text"
                            property={props.property}
                            onChange={e => props.onChange(e)}
                            value={props.value}
                            placeholder={props.placeholder ? props.placeholder : ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LabeledTextInput;