import React, { Component } from 'react';

import viewIcon from '../../Assets/images/view-icon.png';

import PagedViewTable from '../Resusable/PagedViewTable';

import { adminGetStudents } from '../../store/axios';

class AdminStudents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            filter: {
                page: 0,
                pageSize: 10,
                firstName: '',
                lastName: '',
                email: '',
                orderBy: '',
                order: 1,
            },
            total: 0,
        }

        this.onClickSort = this.onClickSort.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onClickFilter = this.onClickFilter.bind(this);
        this.onClickNextPage = this.onClickNextPage.bind(this);
        this.onClickPreviousPage = this.onClickPreviousPage.bind(this);
    }

    componentDidMount() {
        this.getStudents();
    }

    async getStudents(filter) {
        filter = filter ? filter : this.state.filter;

        const response = await adminGetStudents(filter);

        this.setState({
            ...this.state,
            filter,
            students: response.data.students,
            total: response.data.total,
        });
    }

    onClickSort(propertyName) {
        if (this.state.filter.orderBy === propertyName) {
            this.getStudents({
                ...this.state.filter,
                order: this.state.filter.order === 1 ? -1 : 1,
                page: 0,
            });
        }
        else {
            this.getStudents({
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
        })
    }

    onClickFilter() {
        this.getStudents();
    }

    onClickNextPage() {
        this.getStudents({
            ...this.state.filter,
            page: this.state.filter.page + 1,
        });
    }

    onClickPreviousPage() {
        this.getStudents({
            ...this.state.filter,
            page: this.state.filter.page - 1,
        });
    }

    render() {
        return (
            <div className="container">
                <img src={viewIcon} className="page-icon" alt="view icon"/>
                <div className="spacer-vertical"></div>
                <h1>Students</h1>
                <PagedViewTable
                    title="Students"
                    rows={this.state.students}
                    filter={this.state.filter}
                    total={this.state.total}
                    columns={[
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
                            label: 'Email',
                            propertyName: 'email',
                            sortable: true,
                            filterable: true,
                        },
                        {
                            label: 'Student Id',
                            propertyName: 'studentId',
                        },
                    ]}
                    onClickSort={this.onClickSort}
                    onChangeFilter={this.onChangeFilter}
                    onClickFilter={this.onClickFilter}
                    onClickNextPage={this.onClickNextPage}
                    onClickPreviousPage={this.onClickPreviousPage}
                />
            </div>
            );
    }
}

export default AdminStudents;