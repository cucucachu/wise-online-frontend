import React, { Component }　from 'react';
import { logout, getTerms, createTerm, setCurrentTerm, adminEditTerm } from '../../store/axios';
import viewIcon from '../../Assets/images/view-icon.png';
import AdminTermsTable from './AdminTermsTable';
import DownloadDataForTerm from './DownloadDataForTerm';
import '../../Assets/css/spinner.css';
import '../../Assets/css/radiobtn.css';

class AdminTermsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            terms: [],
            isLoading: true,
            editing: false,
            creatingNewTerm: false,
            newTermName: '',
            downloadView: false,
            downloadTerm: null,
        }

        this.loadTerms = this.loadTerms.bind(this);
        this.cookiesExpired = this.cookiesExpired.bind(this);
        this.handleSetAsCurrent = this.handleSetAsCurrent.bind(this);
        this.handleClickEditName = this.handleClickEditName.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleClickSaveName = this.handleClickSaveName.bind(this);
        this.handleClickNewTerm = this.handleClickNewTerm.bind(this);
        this.handleChangeNewTermName = this.handleChangeNewTermName.bind(this);
        this.handleClickCancelNewTerm = this.handleClickCancelNewTerm.bind(this);
        this.handleSubmitNewTerm = this.handleSubmitNewTerm.bind(this);
        this.handleClickDownloadView = this.handleClickDownloadView.bind(this);
        this.handleClickCancelDownloadView = this.handleClickCancelDownloadView.bind(this);
    }

    cookiesExpired() {
        sessionStorage.clear();
        logout();
        this.props.history.push({
            pathname: '/admin-login',
            state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
        });
    }

    async handleSetAsCurrent(e, termId) {
        e.preventDefault();
        const response = await setCurrentTerm(termId);

        if (response.status === 200) {
            this.setIsLoading(true);
            await this.loadTerms();
        }
        else {
            this.cookiesExpired();
        }
    }

    async handleClickEditName(e, termId) {
        e.preventDefault();

        const state = Object.assign({}, this.state);
        state.editing = termId;

        this.setState(state);
    }

    async handleChangeName(e, termId) {
        e.preventDefault();

        const state = Object.assign({}, this.state);
        const termBeingEdited = state.terms.filter(t => t._id === termId)[0];
        termBeingEdited.name = e.target.value;

        this.setState(state);
    }

    async handleClickSaveName(e, termId) {
        e.preventDefault();

        const termBeingEdited = this.state.terms.filter(t => t._id === termId)[0];
        const response = await adminEditTerm(termId, termBeingEdited.name);

        if (response.status === 200) {
            this.setIsLoading(true);
            await this.loadTerms();
        }
        else {
            this.cookiesExpired();
        }
    }

    handleClickNewTerm() {
        const state = Object.assign({}, this.state);
        state.creatingNewTerm = true;
        this.setState(state);
    }

    handleChangeNewTermName(e) {
        const state = Object.assign({}, this.state);
        state.newTermName = e.target.value;
        this.setState(state);
    }

    handleClickCancelNewTerm() {
        const state = Object.assign({}, this.state);
        state.creatingNewTerm = false;
        state.newTermName = '';
        this.setState(state);
    }

    async handleSubmitNewTerm(e) {
        e.preventDefault();

        const response = await createTerm(this.state.newTermName);

        if (response.status === 200) {
            this.setIsLoading(true);
            await this.loadTerms();
        }
        else {
            this.cookiesExpired();
        }
    }

    handleClickDownloadView(termId) {
        const state = Object.assign({}, this.state);
        state.downloadView = true;
        state.downloadTerm = state.terms.filter(t => t._id === termId)[0];
        this.setState(state);
    }

    handleClickCancelDownloadView() {
        const state = Object.assign({}, this.state);
        state.downloadView = false;
        state.downloadTerm = null;
        this.setState(state);
    }

    setIsLoading(loading) {
        const state = Object.assign({}, this.state);
        state.isLoading = loading;
        this.setState(state);
    }

    async loadTerms() {
        try {
            const userId = sessionStorage.getItem('userID');
            this.setIsLoading(true);
            const response = await getTerms(userId);
    
            if (response.status === 200) {
                const state = Object.assign({}, this.state);
                state.terms = response.data;
                state.isLoading = false;
                state.editing = false;
                state.newTermName = '';
                state.creatingNewTerm = false;
                this.setState(state);
            }
            else if (response.status === 401) {
                this.cookiesExpired();
            }
            else {
                console.log('something wrong, try again');
            }
        }
        catch (error) {
            console.log(error);
        }  
    }

    async componentDidMount() {
        await this.loadTerms();
    }

    renderTerms() {
        return (
            <div className="row">
                <div className="col-sm">
                    <AdminTermsTable
                        terms={this.state.terms} 
                        editing={this.state.editing}
                        onClickSetAsCurrentTerm={this.handleSetAsCurrent}
                        onClickEditName={this.handleClickEditName}
                        onChangeName={this.handleChangeName}
                        onClickSaveName={this.handleClickSaveName}
                        onClickNewTerm={this.handleClickNewTerm}
                        onClickDownloadView={this.handleClickDownloadView}
                    />
                </div>
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

    renderNewTerm() {
        return (
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="spacer-vertical"></div>
                    <div className="shadow">
                        <div className="row">
                            <div className="col-sm">
                                <h4>New Term</h4>
                            </div>
                            <div className="col-sm-2">
                                <button 
                                    className="btn-neutral"
                                    onClick={this.handleClickCancelNewTerm}
                                >
                                    &#128473;
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <strong>Name:  </strong>
                                <input 
                                    type="text" 
                                    className="input-settings"
                                    value={this.state.newTermName} 
                                    onChange={this.handleChangeNewTermName}
                                ></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8"></div>
                            <div className="col-sm-4">
                                <button className="btn-primary" onClick={this.handleSubmitNewTerm}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        )
    }

    renderDownloadView() {
        return <DownloadDataForTerm
                    term={this.state.downloadTerm}
                    onClickCancelDownloadView={this.handleClickCancelDownloadView}
                />
    }

    render() {
        return ( 
            <div className="container">
                <img src={viewIcon} className="page-icon" alt="view icon"/>
                <div className="spacer-vertical"></div>
                <h1>Academic Terms</h1>
                <div className="spacer-vertical"></div>
                { 
                    (() => {
                        if (this.state.isLoading) {
                            return this.renderLoading();
                        }
                        else if (this.state.creatingNewTerm) {
                            return this.renderNewTerm();
                        }
                        else if (this.state.downloadView) {
                            return this.renderDownloadView();
                        }
                        else {
                            return this.renderTerms();
                        }
                    })()
                }
            </div>
        );
    }
}

export default AdminTermsPage;