import React from 'react'

import axios from 'axios'

export default class SchoolList extends React.Component{
    state={
        schools: []
    };
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res =>{
            console.log('res: ', res);
            
            this.setState({schools: res.data})
        });
    }
    render(){
        return(
            <ul>
                {this.state.schools.map(school => <li>{school.name}</li>)}
            </ul>
        )
    }

}
