import React from 'react';

function DataPane(props) {
    const dataRows = [];
    const dataPaneKey = Math.floor(Math.random() * 1000);

    for (const key of Object.keys(props.data)) {
        if (Array.isArray(props.data[key])) {
            for (const index in props.data[key]) {
                dataRows.push(
                    <div className='data-row' key={`${dataPaneKey}-${key}-${index}`}>
                        <label>{`${key} ${Number(index) + 1}`}:</label>
                        <span>
                            {props.data[key][index]}
                        </span>
                    </div>
                )
            }
        }
        else {
            dataRows.push(
                <div className='data-row' key={`${dataPaneKey}-${key}`}>
                    <label>{key}:</label>
                    <span>
                        {props.data[key]}
                    </span>
                </div>
            )
        }
    }

    return (
        <div className="shadow full-width">
            <div className="data-pane">
                <h2>{props.title}</h2>
                <hr/>
                {dataRows}
            </div>
        </div>
    )
}

export default DataPane;