import React from 'react';

function AdminTermsRow(props) {
    if (props.editing === props.term._id) {
        return (
            <tr>
                <td>
                    <input type="text" value={props.term.name} onChange={(e) => props.onChangeName(e, props.term._id)}></input>
                </td>
                <td>{props.term.current ? 'X' : '' }</td>
                <td className="float-right">
                    <button className="btn-primary" onClick={e => props.onClickSaveName(e, props.term._id)}>Save</button>
                </td>
            </tr>
        );
    }
    else if (props.editing !== false) {
        return (
            <tr>
                <td>{ props.term.name }</td>
                <td>{props.term.current ? 'X' : '' }</td>
                <td className="float-right"></td>
            </tr>
        )
    }
    else {
        return (
            <tr>
                <td>{ props.term.name }</td>
                <td>{props.term.current ? 'X' : '' }</td>
                <td className="float-right">
                    <div className="dropdown">
                    <button className="btn-dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ...
                    </button>
                        <div className="dropdown-menu">
                            <button className="btn-dropdown" onClick={(e) => props.onClickSetAsCurrentTerm(e, props.term._id)}>Set as Current</button>
                            <button className="btn-dropdown" onClick={(e) => props.onClickEditName(e, props.term._id)}>Edit Name</button>
                            <button className="btn-dropdown" onClick={() => props.onClickDownloadView(props.term._id)}>Attendance Data</button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}

export default AdminTermsRow;