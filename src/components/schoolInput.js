import React from 'react'

import axios from 'axios'

export default class SchoolInput extends React.Component{
    state={
        name: '',
    };

    handleChange = e =>{
        e.preventDefault()
        this.setState({name: e.target.value})
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        const user ={
            user: this.state.name
        }
        axios.post('https://jsonplaceholder.typicode.com/users', {user})
        .then(res =>{
            console.log('res from schoolinput: ', res);
            
        })
    }
    render(){
        return(
            <form onClick={this.handleSubmit}>
                <label>
                    School Name:
                    <input type="text" name="name" onChange={this.handleChange}/>
                </label>
                <button type="submit">Create</button>
            </form>
        )
    }

}
