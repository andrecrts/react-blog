import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './initial/home.js'
import Login from './initial/login.js'
import Signup from './initial/signup.js'
import Post from './initial/post.js'
import {connect} from 'react-redux'
import  AHeader from './auth/aHeader.js'
import  AMisPosts from './auth/aMisPosts.js'
import  ACrear from './auth/aCrear.js'
import  AEditar from './auth/aEditar.js'

const Header = () => {
    return (
        <nav>
            <Link to='/'> home </Link>
            <Link to='/signup'> Sign up </Link>
            <Link to='/login'> Login </Link>
            <Route exact path="/post/:id" component={Post}/>
            <Route exact path="/:user/posts" component={AMisPosts}/>
        </nav>
    )
}
const App = (props) => {

    if(props.login!= null) {
        return(
            <Router>
                <div>
                    <AHeader/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/post/:id" component={Post}/>
                    <Route exact path="/:user/posts" component={AMisPosts}/>
                    <Route exact path="/:user/crear" component={ACrear}/>
                    <Route exact path="/:user/post/:id" component={Post}/>
                    <Route exact path="/:user/post/:id/editar" component={AEditar}/>
                </div>
            </Router>
        )
    }
    return (
        <Router>
            <div>
                <Header/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route exact path="/post/:id" component={Post}/>
                <h2> Dentro de App </h2>
            </div>
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch1: () => {
        
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
