import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from './../../ducks/reducer';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    register = () => {
        const { username, password } = this.state;
        axios.post('/auth/register', { username, password })
        .then(res => {
            this.props.updateUser(res.data);
            this.props.history.push('/dashboard');
        })
        .catch(err => {
            console.log(err)
        })
    }

    login = () => {
        const { username, password } = this.state;
        axios.post('/auth/login', { username, password })
        .then(res => {
            this.props.updateUser(res.data);
            this.props.history.push('/dashboard')
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const { username, password } = this.state;
        return (
            <div>
                <input value = {username} onChange = {e => this.handleChange('username', e.target.value)}/>
                <input value = {password} onChange = {e => this.handleChange('password', e.target.value)}/>
                <button onClick = {this.login}>Login</button>
                <button onClick = {this.register}>Register</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        id: reduxState.id
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);