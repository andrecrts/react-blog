import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ACrearForm from './aCrearForm.js'
import Axios from 'axios'
import { reset } from 'redux-form'


class ACrear extends Component {
    render(props) {
        const manejoDeForma = (data) => {
            const { title, body } = data
            let headers = { 'Authorization': 'Bearer' + this.props.user.jwt }
            Axios.post('https://blog-api-u.herokuapp.com/v1/posts', {
                title,
                body,

            },
            {
                headers
            })
                .then((response) => this.props.creado())
                .catch((error) => this.props.error())
        }
        return (
            <div>
                <h1>Crear post</h1>
                <h4> {this.props.mensaje} </h4>
                <ACrearForm onSubmit={manejoDeForma}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.login,
        mensaje: state.creado,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        creado: () => {
            dispatch(reset('ACrearForm'))
            dispatch({type: 'CREATED'})
        },
        error: () => dispatch({type:'ERROR_CREATED'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ACrear)

