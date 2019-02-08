import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    componentDidMount(){
        return this.getPosts()
    }

    getPosts(){
        if(!this.state.userposts){
            axios.get('/api/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
        } else {
            axios.get(`/api/posts/${this.props.id}`)
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
        }
    }

    render(){
        const postList = this.state.posts.map(postObj => {
            return (
                <div>
                    <p>{postObj.username}</p>
                    <p>{postObj.title}</p>
                    <p>{postObj.img}</p>
                    <p>{postObj.content}</p>
                </div>
            )
        })
        return (
            <div>
                { postList }
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        id: reduxState.id
    }
}

export default connect(mapStateToProps)(Dashboard);