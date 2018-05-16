import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AEditarForm from './aEditarForm.js'
import Axios from 'axios'
import { reset } from 'redux-form'


class AEditar extends Component {
    componentWillUnmount(){
        this.props.clear()
    }
    render(props) {
        const manejoDeForma = (data) => {
            console.log(this.props.edit)
            this.props.editar(data, this.props.edit.id, this.props.user.jwt)
        }
        return (
            <div>
                <h1>Crear post</h1>
                <h4> {this.props.mensaje} </h4>
                <AEditarForm onSubmit={manejoDeForma}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.login,
        edit: state.editPost,
        mensaje: state.mensajeEditar,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editar: (data, idPost, token) => {
            const { title, body } = data
            let headers = { 'Authorization': 'Bearer' + token }
            Axios.patch(`https://blog-api-u.herokuapp.com/v1/posts/${idPost}`, {
                post:{
                    title,
                    body,
                }

            },
            {
                headers
            })
                .then((response) => dispatch({type:'EDITED'}))
                .catch((error) => dispatch({type:'ERROR_EDITED'}))
        },
        clear: () => {
            dispatch({type:'CLEAR_EDIT_POST'})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AEditar)

