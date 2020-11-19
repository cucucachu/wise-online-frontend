import React, { Component }　from 'react';
import { logout, adminGetProfessors } from '../../store/axios';
import viewIcon from '../../Assets/images/view-icon.png';
import '../../Assets/css/spinner.css';
import '../../Assets/css/radiobtn.css';

import ProfessorsTable from './ProfessorsTable';

class AdminProfessors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            professors: [],
            isLoading: true,
        }

        this.cookiesExpired = this.cookiesExpired.bind(this);
        this.handleClickViewCourse = this.handleClickViewCourse.bind(this);
    }

    cookiesExpired() {
        sessionStorage.clear();
        logout();
        this.props.history.push({
            pathname: '/admin-login',
            state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
        });
    }

    setIsLoading(loading) {
        const state = Object.assign({}, this.state);
        state.isLoading = loading;
        this.setState(state);
    }

    async loadProfessors() {
        try {
            this.setIsLoading(true);
            const response = await adminGetProfessors();
    
            if (response.status === 200) {
                this.setState({
                    ...this.state,
                    professors: response.data.professors,
                    isLoading: false,

                });
            }
            else if (response.status === 401) {
                this.cookiesExpired();
            }
            else {
                console.log('Something\'s wrong, try again.');
            }
        }
        catch (error) {
            console.log(error);
        }  
    }

    async componentDidMount() {
        await this.loadProfessors();
    }

    handleClickViewCourse(professor) {

        this.props.history.push('/admin/professor/courses', {
            professor,
        });
    }

    renderProfessors() {
        return (
            <div className="row">
                <ProfessorsTable 
                    professors={this.state.professors}
                    onClickViewCourses={this.handleClickViewCourse}
                />

            </div>
        )
    }

    renderLoading() {
        return (
            <div>
                <div className="spacer-vertical"></div>
                <h2>Loading
                    <div className="lds-ellipsis"></div>
                </h2>
            </div>
        );
    }

    render() {
        return ( 
            <div className="container">
                <img src={viewIcon} className="page-icon" alt="view icon"/>
                <div className="spacer-vertical"></div>
                <h1>Professors</h1>
                <div className="spacer-vertical"></div>
                { 
                    (() => {
                        if (this.state.isLoading) {
                            return this.renderLoading();
                        }
                        else {
                            return this.renderProfessors();
                        }
                    })()
                }
            </div>
        );
    }
}

export default AdminProfessors;