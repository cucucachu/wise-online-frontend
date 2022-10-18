import React, { Component } from 'react'
import type { RouteComponentProps } from 'react-router-dom';
import type { UserLoginData } from '../../types';

import attendClass from '../../Assets/images/attend-class.png';
import { markAttendance } from "../../store/axios";

import Spinner from '../Spinner';
import LoginModal from '../LoginModal';
import { ProctorConfigContext, IProctorConfigContext } from '../../contexts/ProctorConfigContext';
import { IAuthContext } from '../../contexts/AuthContext';
import { useQuery, useAuth } from '../../hooks';

import { i18n } from 'web-translate';

type StudentAttendanceFromLinkBaseProps = RouteComponentProps;

type StudentAttendanceFromLinkProps = {
    classId: string;
    keyCode: string;
    proctorContext: IProctorConfigContext;
    authContext: IAuthContext;
    onSuccessfulLogin(loginResponseData: UserLoginData): void;
} & StudentAttendanceFromLinkBaseProps;

type StudentAttendanceFromLinkState = {
    showLogin: boolean;
    error: null | string;
};

class StudentAttendanceFromLink extends Component<StudentAttendanceFromLinkProps, StudentAttendanceFromLinkState> {

    constructor(props: StudentAttendanceFromLinkProps) {
        super(props);

        this.state = {
            showLogin: false,
            error: null,
        };

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    }

    async componentDidMount() {
        await this.tryMarkAttendance();
    }

    async tryMarkAttendance() {
        try {
            const response = await markAttendance(this.props.classId, this.props.keyCode);

            if (response.status === 200) {
                this.props.authContext.storeClassId(this.props.classId);
                this.props.history.push('class/attend-success');
            }
            else if (response.status === 401) {
                this.setState({...this.state, showLogin: true});
            }
            else {
                this.setState({...this.state, error: 'Sorry, this link is no longer valid.'});
            }
        }
        catch (error) {
            this.setState({...this.state, error: 'Sorry, this link is no longer valid.'});
        }
    }

    async handleSuccessfulLogin(loginResponseData: UserLoginData) {
        this.props.onSuccessfulLogin(loginResponseData);
        this.setState({...this.state, showLogin: false});
        await this.tryMarkAttendance();
    }

    render() {
        return (
            <div className="container">
                <img src={attendClass} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical" />
                <h1>{i18n("Marking Your Attendance for")} {this.props.classId}</h1>
                <div className="spacer-vertical" />
                {(() => {
                    if (this.state.showLogin) {
                        return (<LoginModal 
                            handleSuccessfulLogin = {this.handleSuccessfulLogin}
                        />)
                    }
                    else if (this.state.error) {
                        return <p>{i18n("Sorry, this link is no longer valid.")}</p>;
                    } 
                    else {
                        return (<Spinner />);
                    }
                })()}
                
                <div className="spacer-vertical" />
                    
            </div>
        )
    }
}

export default (props: StudentAttendanceFromLinkBaseProps) => {
    const proctorContext = React.useContext(ProctorConfigContext);
    const authContext = useAuth();
    const queryParams = useQuery();
    const classId = queryParams.get('c')!;
    const keyCode = queryParams.get('k')!;

    return (
        <StudentAttendanceFromLink
            {...props}
            classId={classId}
            keyCode={keyCode}
            authContext={authContext!}
            proctorContext={proctorContext}
            onSuccessfulLogin={authContext.onLogin}
        />
    )
};
