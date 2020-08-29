import React from 'react';

import AdminTermsRow from './AdminTermsRow';

function AdminTermsTable(props) {

    if (props.terms) {
        return (
            <div className="shadow">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Term</th>
                            <th>Current</th>
                            <th className='float-right'>
                                {
                                    (() => {
                                        if (props.editing === false) {
                                            return (
                                                <button 
                                                    className="btn-primary"
                                                    onClick={props.onClickNewTerm}
                                                >
                                                    New Term
                                                </button>
                                            )
                                        }
                                    })()
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
        
                                const rows = [];
        
                                for (const termIndex in props.terms) {
                                    const term = props.terms[termIndex];
                                    rows.push(<AdminTermsRow
                                        term={term}
                                        editing={props.editing}
                                        onClickEditName={props.onClickEditName}
                                        onChangeName={props.onChangeName}
                                        onClickSaveName={props.onClickSaveName}
                                        onClickSetAsCurrentTerm={props.onClickSetAsCurrentTerm}
                                        onClickDownloadView={props.onClickDownloadView}
                                        key={termIndex}
                                    />);
                                }
        
                                return rows;
                            })()
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    return <div></div>
}

export default AdminTermsTable;