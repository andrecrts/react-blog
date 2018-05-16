import React from 'react'
import SignupFormFinal  from './signupFormFinal.js'
import Axios from 'axios'
import { connect } from 'react-redux'
import {reset} from 'redux-form'

const Signup = (props) => {
    const functionForma = (datos) => {
        Axios.post('https://blog-api-u.herokuapp.com/users/', {
            user:{
                name: datos.username,
                email:datos.email,
                password: datos.password,
                password_confirmation: datos.password
            }
        })
            .then((response)=> props.success())
            .catch((error)=> props.error())
    }
    return (
        <div>
            <h2> Signup </h2>
            <br/>
            {props.mensaje.mensaje}
            <SignupFormFinal onSubmit={functionForma}/>
        </div>
    )
}

const mapStateToProps = (state)=> {
    return {
        mensaje: state.userStatus
    }
}

const mapDispatchToProps = (dispatch, ownProps)=> {
    return {
        success: () => {
            dispatch({type:'USER_CREATED'})
            dispatch(reset('signupFormFinal'))
        },
        error: () => {
            dispatch({type:'USER_ERROR'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

