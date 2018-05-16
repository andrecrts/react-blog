import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Pagination from './../pagination.js'
import { Link } from 'react-router-dom'

class Home extends Component{

    componentDidMount(){
        this.props.dispatch1(this.props.pagination.current)
    }


    componentWillUnmount(){
        this.props.clearData()
    }

    componentWillReceiveProps(next_props){
        if(next_props.pagination.current != this.props.pagination.current){
            this.props.dispatch1(next_props.pagination.current)
        }
    }
    allPosts = () => {
        const Posts = this.props.allPosts.map((post) => {
            if((this.props.login) && this.props.login.id == post.user_id){
                return(
                    <Link to={`/${post.user_id}/post/${post.id}`} key={post.id}>
                        <h4 key={post.id}>{post.title}</h4>
                    </Link>
                )
            }
            return (
                <Link to={`/post/${post.id}`} key={post.id}>
                    <h4 key={post.id}>{post.title}</h4>
                </Link>
            )
        })
        return Posts
    }

    render(){
        return(
            <div>
                <h2> Home </h2>
                <Pagination/>
                {this.allPosts()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts,
        login: state.login,
        pagination: state.pagination,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch1: (page) => {
            axios.get(`https://blog-api-u.herokuapp.com/v1/posts?page=${page}`)
                .then((response) => {
                    dispatch({type:"DATA_LOADED",
                        data: response.data})
                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        clearData: () => {
           dispatch({type:"CLEAR_DATA"})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)

