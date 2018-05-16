import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const allPosts = (state=[], action) => {
    let nState = Object.assign({}, state)
    switch(action.type) {
        case 'DATA_LOADED':
            nState = state = action.data
            return nState
        case 'CLEAR_DATA':
            nState = []
            return nState
        default:
            return state
    }
}


const userCreated = (state={}, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'USER_CREATED':
            nState = {mensaje: 'Usuario se creo con exito'}
            return nState
        case 'USER_ERROR':
            nState = {mensaje: 'El usuario no se creo'}
            return nState
        default:
            return {}
    }
}


const session = (state = null, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'LOGIN':
            nState = action.data.data
            return nState
        case 'LOGOUT':
            nState = null
            return nState
        default:
            return state
    }
}

const pagination = (state={total: 1, current: 1}, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'SET_CURRENT':
            nState.current = action.page
            return nState
        case 'SET_TOTAL':
            nState.total = action.total
            return nState
        default:
            return state
    }
}


const showPost = (state={}, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'GET_POST':
            nState = action.data
            return nState
        case 'CLEAR_POST':
            nState = {}
            return nState
        default:
            return state
    }
}
const errorPost = (state=null, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'ERROR_GET_POST':
            nState = "ERror al crear post"
            return nState
        default:
            return null
    }
}

const creado = (state=null, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'CREATED':
            nState = "El post se creo con exito"
            return nState
        case 'ERROR_CREATED':
            nState = "El post no se creo con exito"
            return nState
        default:
            return null
    }
}

const personalPosts = (state= [], action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'PERSONAL_POSTS':
            console.log(action.data)
            nState = action.data
            return nState
        case 'CLEAR_PERSONAL_POSTS':
            return []
        default:
            return state
    }
}
const errorPersonalPost = (state=null, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'ERROR_PERSONA_POSTS':
            nState = "No tienes posts"
            return nState
        default:
            return null
    }
}

const editPost = (state={}, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'GET_POST':
            nState = action.data
            return nState
        case 'CLEAR_EDIT_POST':
            nState = {}
            return nState
        default:
            return state
    }
}

const mensajeEditar = (state=null, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'EDITED':
            nState = 'El post fue editado correctamente'
            return nState
        case 'ERROR_EDITED':
            return 'Error el post no fue editado'
        default:
            return null
    }
}
const mensajeEliminar = (state=null, action) => {
    let nState = Object.assign({}, state)
    switch(action.type){
        case 'ELIMINATED':
            nState = 'El post fue eliminado correctamente'
            return nState
        case 'ERROR_ELIMINATED':
            return 'Error el post no fue eliminado'
        default:
            return null
    }
}
const reducer = combineReducers({
    allPosts: allPosts,
    form: formReducer,
    userStatus: userCreated,
    pagination:pagination,
    login:session,
    showPost: showPost,
    errorPost: errorPost,
    creado: creado,
    personalPosts: personalPosts,
    errorPersonalPost: errorPersonalPost,
    editPost: editPost,
    mensajeEditar: mensajeEditar,
    mensajeEliminar,
})

const store = createStore(reducer)


export default store
