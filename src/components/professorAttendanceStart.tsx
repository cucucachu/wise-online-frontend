import * as React from 'react'
import { Link, RouteComponentProps } from "react-router-dom"

import editIcon from '../Assets/images/edit-icon.png'

import ClipboardLink from './ClipboardLink';
//axios
import { startAttendance, logout } from '../store/axios'

import { i18n } from 'web-translate';

type ProfessorAttendanceStartProps = {

} & RouteComponentProps<{}, {}, any>;

class ProfessorAttendanceStart extends React.Component<ProfessorAttendanceStartProps, any> {
    constructor(props: ProfessorAttendanceStartProps) {
        super(props);
        this.state = {
            attendanceCode: '',
            course: {
                classId: '...',
            },
            link: '',
        }
    }

    async loadAttendance(course: any) {
        const response = await startAttendance(course._id);

        if(response.status === 401){
            sessionStorage.clear();
            logout()
            this.props.history.push({
                pathname: '/professor-login',
                state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
              })
        }
        else {
            const attendanceData = response.data;

            this.setState({
                link: this.createLink(this.state.course.classId, attendanceData.keyCode),
                attendanceCode: attendanceData.keyCode,
            });
        }
        
    }

    createLink(classId: string, keyCode: string) {
        if (window.location.hostname === 'localhost') {
            return `http://localhost:3000/student/attendanceLink?c=${classId.replaceAll(/ /g, '%20')}&k=${keyCode}`;
        }
        else {
            return `https://${window.location.hostname}/student/attendanceLink?c=${classId.replaceAll(/ /g, '%20')}&k=${keyCode}`;
        }
    }
    
    componentDidMount() {
        const { course } = this.props.location.state;

        const state = Object.assign({}, this.state, { course });
        state.course = course;
        this.loadAttendance(course);
        this.setState({ course });
    }

    copyLink() {
        const link: any = document.getElementById('attendance-link');
        link.select();
    }

    render(){
        return(
            <div className="container">
                <img src={editIcon} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical" />
                <h1>{i18n("Share this URL Link with Students")}</h1>
                <div className="spacer-vertical-s"></div>
                <ClipboardLink 
                    link={this.state.link}
                />
                <div className="spacer-vertical" />
                <h2 className="bold">{i18n("Or share this attendance code with your students")}</h2>
                <h2 className="bold">{this.state.attendanceCode}</h2>
                <div className="spacer-vertical" />
                <Link 
                    to={
                        {
                            pathname: "/professor/course",
                            state: {
                                course: this.state.course,
                            }
                        }
                    }
                >
                    <button className="btn">{i18n("Done")}</button>
                </Link>
            </div>
        )
    }
}

export default ProfessorAttendanceStart;