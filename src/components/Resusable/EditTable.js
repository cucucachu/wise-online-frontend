import React from 'react';

function EditTable(props) {
    

    const editRows = [];

    for (const rowNumber in props.rows) {
        const row = props.rows[rowNumber];

        editRows.push(<EditRow
            rowNumber={rowNumber}
            row={row}
            onChangeCell={props.onChangeCell}
            columns={props.columns}
            title={props.title}
            key={`${props.title}-${rowNumber}-row`}
            onClickRemoveRow={props.onClickRemoveRow}
        />);
    }

    return (
        <div className="shadow full-width">
            <div className="edit-table">
                <div className='edit-table-header'>
                    <h2>{props.title}</h2>
                    <button onClick={props.onClickAddRow}>+</button>
                </div>
                {(() => {
                    if (props.error) {
                        return <p className="red">{props.error}</p>
                    }
                    else return '';
                })()}
                {(() => {
                    if (props.success) {
                        return <p>{props.success}</p>
                    }
                    else return '';
                })()}
                <hr/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {columnHeaders(props)}
                        </tr>
                    </thead>
                    <tbody>
                        {editRows}
                    </tbody>
                </table>
                <div className="submit-button">
                    <button onClick={props.onClickSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

function columnHeaders(props) {
    const headerCells = [];

    for (const column of props.columns) {
        headerCells.push(
            <th key={`${props.title}-${column.label}-header`}>{column.label}</th>
        )
    }

    headerCells.push(
        <th key={`${props.title}-remove-header`}></th>
    )

    return headerCells;
}

function EditRow(props) {
    const cells = [];

    for (const column of props.columns) {
        let error = undefined;
    
        if (props.row.errors && props.row.errors[column.propertyName]) {
            error = props.row.errors[column.propertyName];
        }


        cells.push(
            <td 
                key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
            >
                <input 
                    type="text" 
                    className={error ? 'error-input': ''}
                    value={props.row[column.propertyName]} 
                    onChange={e => props.onChangeCell(e, props.rowNumber, column.propertyName)}
                />
                {(() => {
                    if (error) {
                        return <p className="red">{error}</p>;
                    }
                    else return '';
                })()}
            </td>
        )
    }

    cells.push(
        <td 
            key={`${props.title}-${props.rowNumber}-remove`}
        >
            <div className='x-button'>
                <button onClick={() => props.onClickRemoveRow(props.rowNumber)}><div>&#128473;</div></button>
            </div>
        </td>
    )

    return (
        <tr>
            {cells}
        </tr>
    );
}

export default EditTable;