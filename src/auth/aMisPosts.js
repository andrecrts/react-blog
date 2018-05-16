import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'

class AMisPosts extends Component {

    componentDidMount(){
        this.props.getPosts(this.props.login.id, this.props.login.jwt)
    }

    componentWillUnmount(){
        this.props.clear()
    }

    post= () => {
        var misPosts
        console.log(this.props.posts)
        if(this.props.posts.length != 0){
            misPosts = this.props.posts.map((p) => {
                return(
                    <Link to={`/${p.user_id}/post/${p.id}`} key={p.id}><p>{p.title}</p></Link>
                )
            })
        }
        else {
            misPosts = null
        }
        return misPosts
    }

    render() {
        return (
            <div>
                <h1>Mis Posts</h1>
                <Link to={`/${this.props.login.id}/crear`}> Crear Post </Link>
                <h2> Lista de posts </h2>
                {this.post()}
                {this.props.errorPosts}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        posts: state.personalPosts,
        errorPosts: state.errorPersonalPosts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (userId, token) => {
            let headers = { 'Authorization': 'Bearer'+token }
            Axios.get(`https://blog-api-u.herokuapp.com/users/${userId}/posts`, { headers })
                .then((response) => dispatch({type:'PERSONAL_POSTS', data: response.data.posts}))
                .catch((error) => dispatch({type:'ERROR_PERSONAL_POSTS'}))
        },
        clear: () => {
            dispatch({type:'CLEAR_PERSONAL_POSTS'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AMisPosts)
