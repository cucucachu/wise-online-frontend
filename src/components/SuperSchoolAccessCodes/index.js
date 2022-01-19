import React, { Component } from 'react';

import viewIcon from '../../Assets/images/view-icon.png';

import PagedViewTable from '../Resusable/PagedViewTable';

import { superGetAccessCodes, superGenerateAccessCodes, getAccessCodesCSVURL, downloadNewAccessCodesCSVURL } from '../../store/axios';

import { i18n } from 'web-translate';

class SuperSchoolAccessCodes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.location.state,
            accessCodes: [],
            newAccessCodes: null,
            filter: {
                page: 0,
                pageSize: 10,
                orderBy: '',
                order: 1,

                _id: '',
                firstName: '',
                lastName: '',
                email: '',
                studentId: '',
                batchNumber: '',
            },
            total: 0,
        }

        this.onClickSort = this.onClickSort.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onClickFilter = this.onClickFilter.bind(this);
        this.onClickNextPage = this.onClickNextPage.bind(this);
        this.onClickPreviousPage = this.onClickPreviousPage.bind(this);
        this.handleClickGenerateAccessCodes = this.handleClickGenerateAccessCodes.bind(this);
        this.handleClickCloseGenerateAccessCodes = this.handleClickCloseGenerateAccessCodes.bind(this);
        this.handleChangeGenerateAccessCodes = this.handleChangeGenerateAccessCodes.bind(this);
        this.handleClickSubmitGenerateAccessCodes = this.handleClickSubmitGenerateAccessCodes.bind(this);
    }

    componentDidMount() {
        this.getAccessCodes();
    }

    async getAccessCodes(filter) {
        filter = filter ? filter : this.state.filter;
        const response = await superGetAccessCodes(this.state.school._id, filter);

        this.setState({
            ...this.state,
            filter,
            accessCodes: response.data.accessCodes,
            total: response.data.total,
        });
    }

    onClickSort(propertyName) {
        if (this.state.filter.orderBy === propertyName) {
            this.getAccessCodes({
                ...this.state.filter,
                order: this.state.filter.order === 1 ? -1 : 1,
                page: 0,
            });
        }
        else {
            this.getAccessCodes({
                ...this.state.filter,
                orderBy: propertyName,
                order: 1,
                page: 0,
            });
        }
    }

    onChangeFilter(e, propertyName) {        
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                [propertyName]: e.target.value,
                page: 0,
            }
        });
    }

    onClickFilter() {
        this.getAccessCodes(this.state.filter);
    }

    onClickNextPage() {
        this.getAccessCodes({
            ...this.state.filter,
            page: this.state.filter.page + 1,
        });
    }

    onClickPreviousPage() {
        this.getAccessCodes({
            ...this.state.filter,
            page: this.state.filter.page - 1,
        });
    }

    handleClickGenerateAccessCodes() {
        this.setState({
            ...this.state,
            newAccessCodes: {
                numberOfCodes: '',
                generatedCodes: [],
            }
        });
    }

    handleClickCloseGenerateAccessCodes() {
        this.setState({
            ...this.state,
            newAccessCodes: null,
        });
    }

    handleChangeGenerateAccessCodes(e) {
        this.setState({
            ...this.state,
            newAccessCodes: {
                ...this.state.newAccessCodes,
                [e.target.id]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
            }
        })
    }

    async handleClickSubmitGenerateAccessCodes(e) {
        e.preventDefault();
        if (!this.state.newAccessCodes || !this.state.newAccessCodes.numberOfCodes) {
            return;
        }

        let { numberOfCodes } = this.state.newAccessCodes;
        numberOfCodes = parseInt(numberOfCodes);

        const request = {
            schoolId: this.state.school._id,
            numberOfCodes,
        };

        const response = await superGenerateAccessCodes(request);

        if (response.status === 200) {
            await this.getAccessCodes();
            this.setState({
                ...this.state,
                newAccessCodes: {
                    accessCodes: response.data
                }
            });
        }
        else {
            this.setState({
                ...this.state,
                error: `Please fix the following field: ${response.data.properties[0]}`,
            });
        }
    }

    renderGenerateAccessCodesPopup() {
        if (this.state.newAccessCodes) {
            return (
                <div className="popup">
                    <div>
                        <button onClick={() => this.handleClickCloseGenerateAccessCodes()}>&#128473;</button>
                        <h2>{i18n("Create Access Codes")}</h2>
                        <hr></hr>
                        {(() => {
                            if (this.state.error) {
                                return <p className="red">{this.state.error}</p>
                            }
                            else return '';
                        })()}

                        <form onSubmit={this.handleClickSubmitGenerateAccessCodes.bind(this)}>
                            <div className="input-wrapper">
                                <span className="input-label">{i18n("How Many?")} </span>
                                <input
                                    id="numberOfCodes"
                                    type="number"
                                    placeholder={i18n("#")}
                                    className=""
                                    name="numberOfCodes"
                                    value={this.state.newAccessCodes.numberOfCodes}
                                    onChange={this.handleChangeGenerateAccessCodes}
                                    required
                                />
                            </div>
                           
                            <input type="submit" className="btn-submit" value="Create Codes" />
                            <span/>
                            
                        </form>
                    </div>
                </div>
            )
        }
        else return '';
    }

    render() {
        return (
            <div className="container">
                <img src={viewIcon} className="page-icon" alt="view icon"/>
                <div className="spacer-vertical" />
                <h1>{this.state.school.name}'s Access Codes</h1>
                <a href={getAccessCodesCSVURL(this.state.school._id)}>Download as CSV</a>
                <div className="spacer-vertical" />
                <a href={downloadNewAccessCodesCSVURL(this.state.school._id)}>Download Last Batch as CSV</a>
                {this.renderGenerateAccessCodesPopup()}
                <PagedViewTable
                    title="Access Codes"
                    rows={this.state.accessCodes ? this.state.accessCodes : []}
                    filter={this.state.filter}
                    total={this.state.total}
                    columns={[
                        {
                            label: 'Access Code',
                            propertyName: '_id',
                            sortable: true,
                            filterable: true,
                        },
                        // {
                        //     label: 'Batch #',
                        //     propertyName: 'batchNumber',
                        //     sortable: true,
                        //     filterable: true,
                        // },
                        {
                            label: 'First Name',
                            propertyName: 'firstName',
                            sortable: true,
                            filterable: true,
                        },
                        {
                            label: 'Last Name',
                            propertyName: 'lastName',
                            sortable: true,
                            filterable: true,
                        },
                        {
                            label: 'Student Email',
                            propertyName: 'email',
                            sortable: true,
                            filterable: true,
                        },
                        {
                            label: 'Student ID',
                            propertyName: 'studentId',
                            sortable: true,
                            filterable: true,
                        },
                    ]}
                    onClickSort={this.onClickSort}
                    onChangeFilter={this.onChangeFilter}
                    onClickFilter={this.onClickFilter}
                    onClickNextPage={this.onClickNextPage}
                    onClickPreviousPage={this.onClickPreviousPage}
                    createButton={{
                        text: "Generate Codes",
                        onClick: this.handleClickGenerateAccessCodes,
                    }}
                />
            </div>
            );
    }
}

export default SuperSchoolAccessCodes;