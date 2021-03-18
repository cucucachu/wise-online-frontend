import React, { Component } from 'react';

import viewIcon from '../../Assets/images/view-icon.png';

import PagedViewTable from '../Resusable/PagedViewTable';

import { adminGetProfessors, getProfessorsCSVURL } from '../../store/axios';

class AdminProfessors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            professors: [],
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

        this.onClickViewCourses = this.onClickViewCourses.bind(this);
    }

    componentDidMount() {
        this.getProfessors();
    }

    async getProfessors(filter) {
        filter = filter ? filter : this.state.filter;

        const response = await adminGetProfessors(filter);

        for (const professor of response.data.professors) {
            professor.numberOfCourses = professor.courses.length;
            professor.name = `${professor.firstName} ${professor.lastName}`;
        }

        this.setState({
            ...this.state,
            filter,
            professors: response.data.professors,
            total: response.data.total,
        });
    }

    onClickSort(propertyName) {
        if (this.state.filter.orderBy === propertyName) {
            this.getProfessors({
                ...this.state.filter,
                order: this.state.filter.order === 1 ? -1 : 1,
                page: 0,
            });
        }
        else {
            this.getProfessors({
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
        this.getProfessors();
    }

    onClickNextPage() {
        this.getProfessors({
            ...this.state.filter,
            page: this.state.filter.page + 1,
        });
    }

    onClickPreviousPage() {
        this.getProfessors({
            ...this.state.filter,
            page: this.state.filter.page - 1,
        });
    }

    onClickViewCourses(rowIndex) {
        this.props.history.push('/admin/professor/courses', {
            professor: this.state.professors[rowIndex],
        });
    }

    render() {
        return (
            <div className="container">
                <img src={viewIcon} className="page-icon" alt="view icon"/>
                <div className="spacer-vertical" />
                <h1>Professors</h1>
                <a href={getProfessorsCSVURL()}>Download as CSV</a>
                <PagedViewTable
                    title="Professors"
                    rows={this.state.professors}
                    filter={this.state.filter}
                    total={this.state.total}
                    columns={[
                        {
                            label: 'Professor',
                            propertyName: 'name',
                        },
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
                            label: 'Setup Key',
                            propertyName: 'setupKey',
                        },
                        {
                            label: 'Courses',
                            propertyName: 'numberOfCourses',
                            onClick: this.onClickViewCourses,
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

export default AdminProfessors;