import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = function(props){
    const { username, profile_pic } = props;
    return (
        <div>{props.location.pathname === '/'
              ? <div></div>
              : <div>
                    <div>
                        <img src = { profile_pic } alt='Profile Pic'/>
                        <h1>{username}</h1>
                    </div>
                    <Link to = '/dashboard'><button>Home</button></Link>
                    <Link to = '/post/:postid'><button>New Post</button></Link>
                    <Link to = '/'><button>Logout</button></Link>
                </div>
                }      
        </div>
    )
}

// logout = () => {
//     axios.post('/auth/logout')
//     .then(res => {
//         props.updateUser({})
//         props.history.push('/')
//     })
// }

const mapStateToProps = reduxState => {
    return {
        username: reduxState.username,
        profile_pic: reduxState.profile_pic
    }
}

export default withRouter(connect(mapStateToProps)(Nav));