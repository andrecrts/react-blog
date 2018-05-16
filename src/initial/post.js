import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class Post extends Component {

    componentDidMount(){
        this.props.getPost()
    }
    componentWillUnmount(){
        this.props.clear()
    }

    editar = () => {
        if(this.props.routerProps.match.params.user ){
            return(
                <div>
                    <Link to={`/${this.props.post.user_id}/post/${this.props.post.id}/editar`}>
                        <h4> Editar </h4>
                    </Link>
                    <button onClick={() => { this.props.eliminar(this.props.post.id, this.props.user)}}>
                        Eliminar
                    </button>
                </div>
            )
        }
    }
    render() {
        return(
            <div>
                <h2> {this.props.errorPost}</h2>
                <h4> {this.props.mensajeEliminar}</h4>
                <h4> {this.props.post.title}</h4>
                <h4> {this.props.post.body}</h4>
                {this.editar()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.showPost,
        errorPost: state.errorPost,
        routerProps: ownProps,
        user: state.login,
        mensajeEliminar: state.mensajeEliminar,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPost: () => {
            Axios.get(`https://blog-api-u.herokuapp.com/v1/posts/${ownProps.match.params.id}`)
                .then((response) => dispatch({type:'GET_POST', data: response.data}))
                .catch((error) => dispatch({type:'ERROR_GET_POST'}))
        },
        clear: () => {
            dispatch({type:'CLEAR_POST'})
        },
        eliminar: (postId, user) => {
            let headers = { 'Authorization': 'Bearer' + user.jwt }
            Axios.delete(`https://blog-api-u.herokuapp.com/v1/posts/${postId}`, {
                headers
            })
                .then((response) =>{
                    dispatch({type:'ELIMINATED'})
                    setTimeout(function(){
                        ownProps.history.push(`/${user.id}/posts`)
                    }, 2000)
                })
                .catch((error) => dispatch({type:'ERROR_ELIMINATED'}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
