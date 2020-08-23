import React from 'react';

import AttendanceRowView from './AttendanceRowView';

function AttendancesTableView(props) {

    return (
        <div className="shadow">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Code</th>
                        <th>Students Present</th>
                        <th>Students Absent</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (() => {

                            const rows = [];

                            const attendances = props.attendances.map(a => a);
                            attendances.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

                            for (const attendance of attendances) {
                                rows.push(<AttendanceRowView
                                    course={props.course}
                                    attendance={attendance}
                                    onClickView={props.onClickView}
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

export default AttendancesTableView;