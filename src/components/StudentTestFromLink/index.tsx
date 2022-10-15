import React, { Component } from 'react'
import type { RouteComponentProps } from 'react-router-dom';

import attendClass from '../../Assets/images/attend-class.png';
import { proctoringStudentStartTest } from "../../store/axios";

import Spinner from '../Spinner';
import LoginModal from '../LoginModal';

import { ProctorConfigContext, IProctorConfigContext } from '../../contexts/ProctorConfigContext';
import { AuthContext, IAuthContext } from '../../contexts/AuthContext';
import { UserLoginData } from '../../types';
import { useQuery } from '../../hooks';

import { i18n } from 'web-translate';
import { logError } from '../../Logger';

type StudentTestFromLinkBaseProps = RouteComponentProps & {
    onSuccessfulLogin(loginResponseData: UserLoginData): void;
};

type StudentTestFromLinkProps = {
    classId: string;
    keyCode: string;
    proctorContext: IProctorConfigContext;
    authContext: IAuthContext;
} & StudentTestFromLinkBaseProps;

type StudentTestFromLinkState = {
    showLogin: boolean;
    error: null | string;
};

class StudentTestFromLink extends Component<StudentTestFromLinkProps, StudentTestFromLinkState> {

    constructor(props: StudentTestFromLinkProps) {
        super(props);

        this.state = {
            showLogin: false,
            error: null,
        };
    }

    async componentDidMount() {
        await this.tryStartTest();
    }

    async tryStartTest() {
        try {
            const response = await proctoringStudentStartTest({
                classId: this.props.classId,
                keyCode: this.props.keyCode
            });

            if (response.status === 200) {
                if (response.data.proctorSession) {
                    this.props.history.push('/student/proctor', {
                        ...response.data,
                    });
                }
                else {
                    this.props.authContext.storeClassId(this.props.classId);
                    this.props.authContext.storeTestAttendanceId(response.data.id);
    
                    if (response.data.proctorConfiguration) {
                        this.props.proctorContext.setScreenshotInterval(response.data.proctorConfiguration.screenshotInterval);
                        this.props.proctorContext.setWebcamInterval(response.data.proctorConfiguration.webcamInterval);
                    }
    
                    sessionStorage.setItem('classId', this.props.classId);
                    this.props.history.push('record-agree-to-terms');
                }
            }
            else if (response.status === 401) {
                this.setState({...this.state, showLogin: true});
            }
            else {
                logError(new Error('Failed to load course'), {
                    responseStatus: response.status,
                    responseData: response.data,
                });

                this.setState({...this.state, error: `Sorry, this link is no longer valid (Error Code: ${response.status}).`});
            }
        }
        catch (error) {
            logError(error);
            this.setState({...this.state, error: 'Sorry, this link is no longer valid.'});
        }
    }

    handleSuccessfulLogin = async (loginResponseData: UserLoginData) => {
        this.props.onSuccessfulLogin(loginResponseData);
        this.setState({...this.state, showLogin: false});
        await this.tryStartTest();
    }

    render() {
        return (
            <div className="container">
                <img src={attendClass} className="page-icon" alt="login icon"/>
                <div className="spacer-vertical" />
                <h1>{i18n("Taking a Test for")} {this.props.classId}</h1>
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

export default (props: StudentTestFromLinkBaseProps) => {
    const proctorContext = React.useContext(ProctorConfigContext);
    const authContext = React.useContext(AuthContext);
    const queryParams = useQuery();
    const classId = queryParams.get('c')!;
    const keyCode = queryParams.get('k')!;

    return (
        <StudentTestFromLink
            {...props}
            classId={classId}
            keyCode={keyCode}
            authContext={authContext!}
            proctorContext={proctorContext}
        />
    )
};
