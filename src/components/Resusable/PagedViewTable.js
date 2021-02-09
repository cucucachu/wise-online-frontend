import React from 'react';

function PagedViewTable(props) {
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
                {filter(props)}
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
                <hr/>
                {pagination(props)}
            </div>
        </div>
    );
}

function filter(props) {
    const filters = [];

    for (const column of props.columns) {
        if (column.filterable) {
            filters.push(
                <div className="filter-row" key={`filter-${column.propertyName}`} >
                    <div className="filter-label">
                        <label>{column.label}:</label>
                    </div>
                    <div className="filter-input">
                        <input 
                            type="text" 
                            value={props.filter[column.propertyName]}
                            autoComplete="off"
                            onChange={e => props.onChangeFilter(e, column.propertyName)}
                        />
                    </div>
                </div>
            )
        }
    }

    if (filters.length) {
        return (
            <div className="paged-view-table-filter">
                <h3>Filter</h3>
                <hr/>
                {filters}
                <div className="button-row">
                    <div className="width-80-inline"></div>
                    <button className="btn-submit" onClick={props.onClickFilter}>Filter</button>
                </div>
            </div>
        )
    }
    else {
        return '';
    }
}

function columnHeaders(props) {
    const headerCells = [];

    for (const column of props.columns) {
        if (column.sortable) {
            headerCells.push(
                <th key={`${props.title}-${column.label}-header`}>
                    {column.label}
                    <button onClick={() => props.onClickSort(column.propertyName)} className="sort-button">
                        {(() => {
                            if (props.filter.orderBy === column.propertyName) {
                                if (props.filter.order === 1) {
                                    return <span>&#9660;</span>
                                }
                                else if (props.filter.order === -1) {
                                    return <span>&#9650;</span>
                                }
                            }
                            else {
                                return <span>&#9658;</span>
                            }
                        })()}
                    </button>
                </th>
            );
        }
        else {
            headerCells.push(
                <th key={`${props.title}-${column.label}-header`}>{column.label}</th>
            );
        }
    }

    return headerCells;
}

function ViewRow(props) {
    const cells = [];

    for (const column of props.columns) {
        const value = props.row[column.propertyName];

        if (Array.isArray(value)) {
            cells.push(
                <td 
                    key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
                >
                    <ul>
                        {(() => {
                            const listItems = [];

                            for (const itemIndex in value) {
                                const item = value[itemIndex];
                                listItems.push(
                                    <li 
                                        key={`${props.title}-${props.rowNumber}-${column.propertyName}-${itemIndex}`}
                                    >
                                        {item}
                                    </li>
                                )
                            }

                            return listItems;
                        })()}
                    </ul>
                </td>
            )
        }
        else {
            if (column.onClick) {
                cells.push(
                    <td 
                        key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
                    >
                        <button 
                            className='btn-link'
                            onClick={() => column.onClick(props.rowNumber)}
                        >
                            {value}
                        </button>
                    </td>
                )
            }
            else {
                cells.push(
                    <td 
                        key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
                    >
                        {value}
                    </td>
                )
            }
        }
    }

    return (
        <tr>
            {cells}
        </tr>
    );
}

function pagination(props) {
    const { total } = props;
    const { page, pageSize } = props.filter;

    return (
        <div className="pagination">
            <div className="pagination-rows">
                <span>{`Showing ${props.rows.length ? page * pageSize + 1 : 0} to ${(page + 1) * pageSize < total ? (page + 1) * pageSize : total } of ${total}`}</span>
            </div>
            <div className="pagination-pages">
                {(() => {
                    if (page !== 0) {
                        return <button onClick={props.onClickPreviousPage}>&#9664;</button>
                    }
                    else return '';
                })()}
                <span>Page {page + 1}</span>
                {(() => {
                    if ((page + 1) * pageSize < total) {
                        return <button onClick={props.onClickNextPage}>&#9658;</button>
                    }
                    else return '';
                })()}
            </div>
        </div>
    )
}

export default PagedViewTable;