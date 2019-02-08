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
        this.componentDidMount = this.componentDidMount.bind(this);
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

    handleToggle(){
        if(this.state.userposts === true){
            this.setState({userposts: false})
        } else {
            this.setState({userposts: true})
        }
        this.componentDidMount()
    }

    render(){
        console.log(this.state.userposts)
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
                <button onClick = {() => this.handleToggle()}>
                        My Posts
                </button>
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