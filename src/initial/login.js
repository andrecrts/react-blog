import React from 'react'
import LoginformFinal from './loginFormFinal.js'
import Axios from 'axios'
import { connect } from 'react-redux'

const Login = (props) => {

    const functionForma = (datos) => {
        console.log(datos)
        const {email, password} = datos
        Axios.post('https://blog-api-u.herokuapp.com/v1/login', {
            login:{
                email,
                password
            }
        })
            .then((response) => {
                props.login(response)
                props.history.push('/')
            })
            .catch((error) => props.error())
    }
    return (
        <div>
            <h2> Login </h2>
            {props.mensaje.mensaje}
            <LoginformFinal onSubmit={functionForma}/>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        mensaje: state.userStatus,
        own: ownProps
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (datos) => {
            dispatch({
                type: 'LOGIN',
                data: datos
            })
        },
        error: () => {
            dispatch({
                type: 'USER_ERROR'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

