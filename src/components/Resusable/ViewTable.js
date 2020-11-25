import React from 'react';

function ViewTable(props) {
    
    const rows = [];

    for (const rowNumber in props.rows) {
        const row = props.rows[rowNumber];

        rows.push(<ViewRow
            rowNumber={rowNumber}
            row={row}
            columns={props.columns}
            title={props.title}
            key={`${props.title}-${rowNumber}-row`}
        />);
    }

    return (
        <div className="shadow full-width">
            <div className="view-table">
                <div className='view-table-header'>
                    <h2>{props.title}</h2>
                    {(() => {
                        if (props.createButton) {
                            return <button onClick={props.createButton.onClick}>+</button>
                        }
                        return '';
                    })()}
                </div>
                <hr/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {columnHeaders(props)}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
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

    return headerCells;
}

function ViewRow(props) {
    const cells = [];

    for (const column of props.columns) {
        if (column.onClick) {
            cells.push(
                <td 
                    key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
                >
                    <button 
                        className='btn-link'
                        onClick={() => column.onClick(props.rowNumber)}
                    >
                        {props.row[column.propertyName]}
                    </button>
                </td>
            )
        }
        else {
            cells.push(
                <td 
                    key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
                >
                    {props.row[column.propertyName]}
                </td>
            )
        }
    }

    return (
        <tr>
            {cells}
        </tr>
    );
}

export default ViewTable;